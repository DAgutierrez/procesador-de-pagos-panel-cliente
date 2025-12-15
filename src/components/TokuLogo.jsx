import React from 'react'
import './TokuLogo.css'

function TokuLogo() {
  return (
    <div className="toku-logo">
      <span className="toku-t">Y</span>
      <span className="toku-o">
        O
        <svg
          className="toku-arrow"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 3L9 6L6 9M9 6H3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="toku-k">Y</span>
      <span className="toku-u">O</span>
    </div>
  )
}

export default TokuLogo

