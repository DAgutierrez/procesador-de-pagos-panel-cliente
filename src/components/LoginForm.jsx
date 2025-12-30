import React from 'react'
import './LoginForm.css'

function LoginForm({ rut, setRut, onSubmit, isLoading = false }) {
  return (
    <div className="login-form-container">
      <div className="login-form-card">
        <h1 className="login-greeting">¡Bienvenido!</h1>
        <form onSubmit={onSubmit} className="login-form">
          <label htmlFor="rut" className="login-label">
            Ingresa RUT o número de propuesta
          </label>
          <input
            id="rut"
            type="text"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            className="login-input"
            placeholder=""
            disabled={isLoading}
          />
          <div className="recaptcha-notice">
            Este sitio está protegido por reCAPTCHA y se aplican la{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="recaptcha-link"
            >
              Política de Privacidad
            </a>{' '}
            y{' '}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="recaptcha-link"
            >
              Términos de Servicio
            </a>{' '}
            de Google.
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Buscando cliente...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm





