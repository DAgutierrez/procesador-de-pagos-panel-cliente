import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NavigationTabs from '../components/NavigationTabs'
import PaymentCard from '../components/PaymentCard'
import ProductCard from '../components/ProductCard'
import {
  saveCustomerInfoToStorage,
  getCustomerInfoFromStorage,
} from '../utils/storage'
import './Dashboard.css'

const API_URL =
  'https://ovukfntlauhftpwymvdr.supabase.co/functions/v1/get-customer-info'

function Dashboard() {
  const { customer_id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('cuotas')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [customerProducts, setCustomerProducts] = useState([])
  const [userData, setUserData] = useState({
    name: '',
    number: customer_id || '',
  })
  const [apiResponse, setApiResponse] = useState(null)
  const [registeringPayment, setRegisteringPayment] = useState(false)

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      if (!customer_id) {
        setError('Customer ID no proporcionado')
        setLoading(false)
        return
      }

      // Intentar cargar desde localStorage primero
      const storedData = getCustomerInfoFromStorage(customer_id)
      if (storedData && storedData.data) {
        console.log('Datos cargados desde localStorage')
        const data = storedData.data
        
        // Si hay un error en la respuesta almacenada, intentar hacer la llamada a la API
        if (data.error) {
          console.log('Error encontrado en datos almacenados, intentando actualizar desde API')
        } else {
          // Usar datos almacenados
          if (data.customer_products && Array.isArray(data.customer_products)) {
            setCustomerProducts(data.customer_products)
          } else {
            setCustomerProducts([])
          }
          setApiResponse(data)
          setUserData((prev) => ({
            ...prev,
            name: data.customer?.name || prev.name,
            number: customer_id,
          }))
          setLoading(false)
          
          // Hacer la llamada a la API en segundo plano para actualizar los datos
          fetchFromAPI()
          return
        }
      }

      // Si no hay datos en localStorage o hay error, hacer la llamada a la API
      await fetchFromAPI()
    }

    const fetchFromAPI = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer_id: customer_id,
          }),
        })

        const data = await response.json()

        // Guardar la respuesta completa en localStorage (incluso si hay error)
        saveCustomerInfoToStorage(customer_id, data)
        setApiResponse(data)

        // Verificar si hay error en la respuesta
        if (data.error) {
          // Si hay error pero tenemos datos almacenados, usar esos
          const storedData = getCustomerInfoFromStorage(customer_id)
          if (storedData && storedData.data && !storedData.data.error) {
            console.log('Usando datos almacenados debido a error en API')
            const stored = storedData.data
            if (stored.customer_products && Array.isArray(stored.customer_products)) {
              setCustomerProducts(stored.customer_products)
            }
          } else {
            setError(data.error || 'Error al obtener información del cliente')
            setCustomerProducts([])
          }
        } else if (data.customer_products && Array.isArray(data.customer_products)) {
          setCustomerProducts(data.customer_products)
        } else {
          setCustomerProducts([])
        }

        // Actualizar userData con datos del cliente (si existen) y el customer_id
        setUserData((prev) => ({
          ...prev,
          name: data.customer?.name || prev.name,
          number: customer_id,
        }))
      } catch (err) {
        console.error('Error fetching customer info:', err)
        
        // Intentar usar datos almacenados si hay error de red
        const storedData = getCustomerInfoFromStorage(customer_id)
        if (storedData && storedData.data && !storedData.data.error) {
          console.log('Usando datos almacenados debido a error de red')
          const stored = storedData.data
          if (stored.customer_products && Array.isArray(stored.customer_products)) {
            setCustomerProducts(stored.customer_products)
            setApiResponse(stored)
          }
        } else {
          setError(err.message || 'Error al cargar la información del cliente')
          setCustomerProducts([])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCustomerInfo()
  }, [customer_id])

  const handleRegisterPayment = async () => {
    if (!customer_id) {
      console.error('Customer ID no disponible')
      return
    }

    setRegisteringPayment(true)

    try {
      // Obtener datos del cliente desde localStorage
      const storedData = getCustomerInfoFromStorage(customer_id)
      const customerData = storedData?.data || {}

      // Extraer username y email del localStorage
      // Buscar en diferentes posibles ubicaciones de los datos
      const username = 
        customerData.username || 
        customerData.name || 
        userData.name || 
        'Diego'
      
      const email = 
        customerData.customer?.email || 
        'generico@gmail.com'

      // Construir la URL de respuesta (hardcodeada como se solicitó)
      const responseUrl = `https://portal-pagos.clubdelseguro.cl/payment-success/${customer_id}`

      // Llamar a la API de clubdelseguro
      const response = await fetch('https://api.clubdelseguro.cl/api/payment-methods/oneclick/startInscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          response_url: responseUrl,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error al iniciar inscripción: ${response.status}`)
      }

      const data = await response.json()

      if (data.status === 'success' && data.object) {
        const { token, url_webpay } = data.object

        // Redirigir a la página intermedia de Transbank
        navigate('/transbank-redirect', {
          state: {
            webpayUrl: url_webpay,
            token: token,
            customer_id: customer_id,
          },
        })
      } else {
        throw new Error('Respuesta inesperada de la API')
      }
    } catch (error) {
      console.error('Error al inscribir medio de pago:', error)
      alert('Error al iniciar el proceso de inscripción. Por favor, intenta nuevamente.')
    } finally {
      setRegisteringPayment(false)
    }
  }

  const renderProducts = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <p>Cargando productos...</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="error-container">
          <p>Error: {error}</p>
        </div>
      )
    }

    if (customerProducts.length === 0) {
      return (
        <div className="no-products-container">
          <p>No hay productos disponibles</p>
        </div>
      )
    }

    return (
      <div className="products-grid">
        {customerProducts.map((product) => (
          <ProductCard
            key={product.id}
            productCode={product.product_code}
            paymentMethod={product.payment_method}
            hasWarning={!product.payment_method}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="dashboard">
      <Header userName={userData.name} userNumber={userData.number} />
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="dashboard-main">
        <div className="dashboard-content">
          {activeTab === 'cuotas' && (
            <>
              <PaymentCard 
                onRegisterPayment={handleRegisterPayment} 
                isLoading={registeringPayment}
              />
              <section className="products-section">
                <h2 className="products-section-title">Mis Productos</h2>
                {renderProducts()}
              </section>
            </>
          )}
          {activeTab === 'productos' && (
            <section className="products-section">
              <h2 className="products-section-title">Mis Productos</h2>
              {renderProducts()}
            </section>
          )}
          {activeTab === 'historial' && (
            <section className="historial-section">
              <h2 className="products-section-title">Historial de Pagos</h2>
              <div className="historial-placeholder">
                <p>No hay historial de pagos disponible</p>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard


