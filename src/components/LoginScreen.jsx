import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import LoginForm from './LoginForm'
import Footer from './Footer'
import './LoginScreen.css'

function LoginScreen() {
  const [rut, setRut] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica de autenticación
    // Por ahora, redirigimos a un customer_id de ejemplo
    // En producción, esto vendría de la respuesta de la API
    if (rut.trim()) {
      // Ejemplo: usar el RUT como customer_id o hacer una llamada a la API
      const customerId = rut.trim().replace(/[^0-9]/g, '') || 'demo'
      navigate(`/dashboard/${customerId}`)
    }
  }

  return (
    <div className="login-screen">
      <Header />
      <main className="login-main">
        <LoginForm rut={rut} setRut={setRut} onSubmit={handleSubmit} />
      </main>
      <Footer />
    </div>
  )
}

export default LoginScreen


