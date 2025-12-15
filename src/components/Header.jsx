import React from 'react'
import Logo from './Logo'
import './Header.css'

function Header({ userName, userNumber }) {
  return (
    <header className="header">
      <div className="header-top-bar"></div>
      <div className="header-content">
        <Logo />
        {userName && userNumber && (
          <div className="header-user-info">
            <span className="header-user-name">{userName}</span>
            <span className="header-user-number">{userNumber}</span>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header


