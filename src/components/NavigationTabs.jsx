import React from 'react'
import './NavigationTabs.css'

function NavigationTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'cuotas', label: 'Mis Cuotas' },
    { id: 'productos', label: 'Mis Productos' },
    // { id: 'historial', label: 'Historial de Pagos' },
  ]

  return (
    <nav className="navigation-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}

export default NavigationTabs











