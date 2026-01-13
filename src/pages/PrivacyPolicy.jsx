import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './PrivacyPolicy.css'

function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <Header />
      <main className="privacy-policy-main">
        <div className="privacy-policy-content">
          <h1 className="privacy-policy-title">Política de Privacidad</h1>
          
          <section className="privacy-section">
            <h2 className="privacy-section-title">1. Información que Recopilamos</h2>
            <p>
              Recopilamos información que usted nos proporciona directamente, incluyendo:
            </p>
            <ul>
              <li>Nombre y datos de contacto</li>
              <li>Información de identificación personal</li>
              <li>Datos de transacciones y pagos</li>
              <li>Información de productos y servicios contratados</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">2. Uso de la Información</h2>
            <p>
              Utilizamos la información recopilada para:
            </p>
            <ul>
              <li>Procesar y gestionar sus pagos y transacciones</li>
              <li>Proporcionar y mejorar nuestros servicios</li>
              <li>Comunicarnos con usted sobre su cuenta y servicios</li>
              <li>Cumplir con obligaciones legales y regulatorias</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">3. Protección de Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger 
              su información personal contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">4. Compartir Información</h2>
            <p>
              No vendemos su información personal. Podemos compartir su información únicamente:
            </p>
            <ul>
              <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio</li>
              <li>Cuando sea requerido por ley o para proteger nuestros derechos</li>
              <li>Con su consentimiento explícito</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">5. Sus Derechos</h2>
            <p>
              Usted tiene derecho a:
            </p>
            <ul>
              <li>Acceder a su información personal</li>
              <li>Rectificar datos inexactos</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">6. Cookies y Tecnologías Similares</h2>
            <p>
              Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el 
              uso del sitio y personalizar el contenido. Puede configurar su navegador para rechazar 
              cookies, aunque esto puede afectar algunas funcionalidades.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">7. Cambios a esta Política</h2>
            <p>
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. 
              Le notificaremos sobre cambios significativos publicando la nueva política en esta página 
              y actualizando la fecha de "Última actualización".
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">8. Contacto</h2>
            <p>
              Si tiene preguntas sobre esta política de privacidad o desea ejercer sus derechos, 
              puede contactarnos a través de los canales de comunicación disponibles en el sitio.
            </p>
          </section>

          <div className="privacy-policy-footer">
            <p className="privacy-last-updated">
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PrivacyPolicy






