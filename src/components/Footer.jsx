import React from 'react'
import TokuLogo from './TokuLogo'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          {/* <a href="#" className="footer-link">
            Enviar SMS a ejecutivo
          </a>
          <a href="#" className="footer-link">
            Enviar correo a ejecutivo
          </a> */}
        </div>
        <div className="footer-credits">
          <span className="footer-text">Con la tecnología de</span>
          {/* <TokuLogo /> */}
          <img className="footer-paid-logo" src="https://ovukfntlauhftpwymvdr.supabase.co/storage/v1/object/public/assets/logo-paid.png" alt="Paid"  />
        </div>
      </div>
    </footer>
  )
}

export default Footer














