import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'

function Logo() {
  return (
    <Link to="/" className="logo-container">
      <img
        src="https://ovukfntlauhftpwymvdr.supabase.co/storage/v1/object/public/assets/logo-cds.jpeg"
        alt="Clubdelseguro"
        className="logo-image"
      />
    </Link>
  )
}

export default Logo

