import React from 'react'
import './ProductCard.css'

function ProductCard({ productCode, productNumber, paymentMethod, hasWarning }) {
  // Usar productCode si está disponible, sino productNumber (para compatibilidad)
  const displayCode = productCode || productNumber

  return (
    <div className="product-card">
      <div className="product-card-header">
        <span className="product-card-number">{displayCode}</span>
        <button className="product-card-menu">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="5" r="1.5" fill="#666666" />
            <circle cx="10" cy="10" r="1.5" fill="#666666" />
            <circle cx="10" cy="15" r="1.5" fill="#666666" />
          </svg>
        </button>
      </div>
      <div className="product-card-status">
        No tiene deuda vencida
      </div>
      <div className="product-card-payment">
        <div className="payment-method-icon">
          <svg
            width="32"
            height="20"
            viewBox="0 0 32 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="20" rx="4" fill="#EB001B" />
            <rect x="16" width="16" height="20" rx="4" fill="#F79E1B" />
          </svg>
        </div>
        <span className="payment-method-text">{paymentMethod}</span>
        {hasWarning && (
          <svg
            className="payment-warning-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2L2 18H18L10 2Z"
              fill="#ff6b35"
              stroke="#ff6b35"
              strokeWidth="1"
            />
            <path
              d="M10 8V12M10 14H10.01"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </div>
  )
}

export default ProductCard


