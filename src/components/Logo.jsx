import React from 'react'
import './Logo.css'

function Logo() {
  return (
    <div className="logo-container">
      <div className="logo-icon">
        <span className="logo-one">1</span>
        <span className="logo-zero">
          0
          <svg
            className="logo-car"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 11L6.5 6.5H17.5L19 11M5 11H3M5 11V16M19 11H21M19 11V16M7 16H17M7 16C7 17.1046 6.10457 18 5 18C3.89543 18 3 17.1046 3 16C3 14.8954 3.89543 14 5 14C6.10457 14 7 14.8954 7 16ZM21 16C21 17.1046 20.1046 18 19 18C17.8954 18 17 17.1046 17 16C17 14.8954 17.8954 14 19 14C20.1046 14 21 14.8954 21 16Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <div className="logo-text">
        <div className="logo-title">Clubdelseguro</div>
        <div className="logo-tagline">AÑOS JUNTOS</div>
      </div>
    </div>
  )
}

export default Logo

