import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginScreen from './components/LoginScreen'
import Dashboard from './pages/Dashboard'
import PaymentSuccess from './pages/PaymentSuccess'
import TransbankRedirect from './pages/TransbankRedirect'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/dashboard/:customer_id" element={<Dashboard />} />
        <Route
          path="/payment-success/:customer_id"
          element={<PaymentSuccess />}
        />
        <Route
          path="/transbank-redirect"
          element={<TransbankRedirect />}
        />
      </Routes>
    </Router>
  )
}

export default App


