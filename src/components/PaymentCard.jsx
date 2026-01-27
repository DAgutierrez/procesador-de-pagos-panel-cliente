import React, { useEffect, useMemo, useState } from 'react'
import './PaymentCard.css'

function PaymentCard({
  onRegisterPayment,
  isLoading = false,
  customerId,
  companyId = null
}) {
  const [debts, setDebts] = useState([])
  const [loadingDebts, setLoadingDebts] = useState(false)

  // ✅ MODAL
  const [selectedDebt, setSelectedDebt] = useState(null)

  const parseDateSafe = (dateStr) => {
    if (!dateStr) return null

    // ISO: 2026-01-01
    if (dateStr.includes('-')) return new Date(dateStr + 'T00:00:00')

    // mm/dd/yyyy
    if (dateStr.includes('/')) {
      const [mm, dd, yyyy] = dateStr.split('/')
      return new Date(`${yyyy}-${mm}-${dd}T00:00:00`)
    }

    const d = new Date(dateStr)
    return isNaN(d.getTime()) ? null : d
  }

  const formatAmountCLP = (amount) => {
    return (
      '$' +
      new Intl.NumberFormat('es-CL', { maximumFractionDigits: 0 }).format(
        Number(amount || 0)
      )
    )
  }

  const formatDateCL = (dateStr) => {
    const d = parseDateSafe(dateStr)
    if (!d) return '-'
    return d.toLocaleDateString('es-CL')
  }

  const formatPeriodoCL = (dateStr) => {
    const d = parseDateSafe(dateStr)
    if (!d) return '-'

    // ✅ Mes en español, con primera letra mayúscula
    const month = new Intl.DateTimeFormat('es-CL', { month: 'long' }).format(d)
    const monthCap = month.charAt(0).toUpperCase() + month.slice(1)

    // ✅ Año
    const year = d.getFullYear()

    // ✅ Formato exacto: "Enero, 2026"
    return `${monthCap}, ${year}`
  }


  // ✅ Calcula si está vencida: pending + due_date ya pasó
  const overdueDebts = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return debts.filter((d) => {
      const due = parseDateSafe(d.due_date)
      if (!due) return false

      const status = (d.status ?? '').toString().trim().toLowerCase()
      return status === 'pending' && due < today
    })
  }, [debts])

  useEffect(() => {
    if (!customerId) return

    const fetchDebts = async () => {
      try {
        setLoadingDebts(true)

        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get_debs_by_customerId`

        const res = await fetch(
          url,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // ⚠️ OJO: NO uses service_role en frontend en producción (te pueden robar el proyecto)
              'apikey': import.meta.env.VITE_SUPABASE_SERVICE_ANON_KEY,
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_SERVICE_ANON_KEY}`
            },
            body: JSON.stringify({ customer_id: customerId })
          }
        )

        const json = await res.json()

        if (!res.ok) {
          console.error('❌ Error API:', json)
          setDebts([])
          return
        }

        setDebts(json.items ?? [])
      } catch (err) {
        console.error('❌ Error cargando deudas:', err)
        setDebts([])
      } finally {
        setLoadingDebts(false)
      }
    }

    fetchDebts()
  }, [customerId, companyId])

  // ✅ LOADING
  if (loadingDebts) {
    return (
      <div className="payment-card">
        <div className="payment-card-content">
          <div className="payment-card-text">
            <h2 className="payment-card-title">Cargando cuotas...</h2>
            <p className="payment-card-subtitle">El internet hace lo que puede.</p>
          </div>
        </div>
      </div>
    )
  }

  // ✅ SI HAY VENCIDAS: TABLA
  if (overdueDebts.length > 0) {
    return (
      <div className="debts-wrapper">

        {/* ✅ Header arriba de la tabla */}
        <div className="debts-header">
          <button
            className="debts-header-button"
            onClick={onRegisterPayment}
            disabled={isLoading}
          >
            {isLoading ? 'Procesando...' : 'Inscribir medio de pago'}
          </button>
        </div>


        <div className="debts-card">
          <table className="debts-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}></th>
                <th>Monto</th>
                <th>Vencimiento</th>
                <th>Estado</th>
                <th>Producto</th>
                <th>Detalles</th>
              </tr>
            </thead>

            <tbody>
              {overdueDebts.map((d) => (
                <tr key={d.id}>
                  <td>
                    <input type="checkbox" />
                  </td>

                  <td>{formatAmountCLP(d.amount)}</td>
                  <td>{formatDateCL(d.due_date)}</td>

                  <td>
                    <span className="badge overdue">Vencida</span>
                  </td>

                  <td>
                    <span className="linkish">{d.external_id ?? '-'}</span>
                  </td>

                  <td>
                    <button
                      className="link-button"
                      onClick={() => setSelectedDebt(d)}
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="debts-footer-line" />
        </div>

        {/* ✅ MODAL */}
        {selectedDebt && (
          <DebtDetailsModal
            debt={selectedDebt}
            onClose={() => setSelectedDebt(null)}
            formatAmountCLP={formatAmountCLP}
            formatDateCL={formatDateCL}
            formatPeriodoCL={formatPeriodoCL}
          />
        )}
      </div>
    )
  }


  // ✅ SI NO HAY VENCIDAS: CARD
  return (
    <div className="payment-card">
      <div className="payment-card-content">
        <div className="payment-card-text">
          <h2 className="payment-card-title">¡No tienes deuda vencida!</h2>
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

// ✅ COMPONENTE MODAL
function DebtDetailsModal({ debt, onClose, formatAmountCLP, formatDateCL, formatPeriodoCL }) {
  const patente = debt.patent ?? '-'
  const compania = debt.company_name ?? '-'
  const periodo = formatPeriodoCL(debt.due_date)


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <h2 className="modal-title">Detalles cuota</h2>

        <div className="modal-row">
          <span className="modal-label">Monto</span>
          <span className="modal-value">{formatAmountCLP(debt.amount)}</span>
        </div>

        <div className="modal-row">
          <span className="modal-label">Vencimiento</span>
          <span className="modal-value">{formatDateCL(debt.due_date)}</span>
        </div>

        <div className="modal-row">
          <span className="modal-label">Estado</span>

          {(() => {
            const status = (debt.status ?? "").toString().trim().toLowerCase()

            // ✅ Si viene overdue desde backend
            if (status === "overdue") {
              return <span className="badge overdue">Vencida</span>
            }

            // ✅ Si viene paid
            if (status === "paid") {
              return <span className="badge paid">Pagada</span>
            }

            // ✅ Si viene pending pero ya venció por fecha
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            const due = debt.due_date ? new Date(debt.due_date + "T00:00:00") : null
            const isOverdue = due && due < today

            if (status === "pending" && isOverdue) {
              return <span className="badge overdue">Vencida</span>
            }

            return <span className="badge pending">Pendiente</span>
          })()}
        </div>


        <div className="modal-row">
          <span className="modal-label">Producto</span>
          <span className="modal-value linkish">{debt.external_id ?? '-'}</span>
        </div>

        <div className="modal-row">
          <span className="modal-label">Periodo</span>
          <span className="modal-value">{periodo}</span>
        </div>

        <div className="modal-row">
          <span className="modal-label">Patente</span>
          <span className="modal-value">{patente}</span>
        </div>

        <div className="modal-row">
          <span className="modal-label">Compañía</span>
          <span className="modal-value">{compania}</span>
        </div>

        <div className="modal-row">
          <span className="modal-label">Cuota</span>
          <span className="modal-value">{formatAmountCLP(debt.amount)}</span>
        </div>
      </div>
    </div>
  )
}


