import React from 'react'
import './PaymentCard.css'

function PaymentCard({ onRegisterPayment, isLoading = false }) {
  return (
    <div className="payment-card">
      <div className="payment-card-content">
        <div className="payment-card-text">
          <h2 className="payment-card-title">
            ¡No tienes cuotas disponibles para pago!
          </h2>
          <p className="payment-card-subtitle">
            Inscribe un medio de pago y despreocúpate
          </p>
        </div>
        <button
          className="payment-card-button"
          onClick={onRegisterPayment}
          disabled={isLoading}
        >
          {isLoading ? 'Procesando...' : 'Inscribir medio de pago'}
        </button>
      </div>
    </div>
  )
}

export default PaymentCard


