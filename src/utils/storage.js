/**
 * Utilidades para manejar el almacenamiento de información del cliente en localStorage
 */

/**
 * Obtiene la clave de almacenamiento para un customer_id específico
 * @param {string} customerId - ID del cliente
 * @returns {string} Clave de almacenamiento
 */
export const getStorageKey = (customerId) => `customer_info_${customerId}`

/**
 * Guarda la información del cliente en localStorage
 * @param {string} customerId - ID del cliente
 * @param {object} data - Datos de la respuesta de la API
 */
export const saveCustomerInfoToStorage = (customerId, data) => {
  try {
    const storageKey = getStorageKey(customerId)
    const dataToStore = {
      data: data,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(storageKey, JSON.stringify(dataToStore))
    console.log('Datos guardados en localStorage para customer:', customerId)
    return true
  } catch (error) {
    console.error('Error al guardar en localStorage:', error)
    return false
  }
}

/**
 * Obtiene la información del cliente desde localStorage
 * @param {string} customerId - ID del cliente
 * @returns {object|null} Datos almacenados o null si no existen
 */
export const getCustomerInfoFromStorage = (customerId) => {
  try {
    const storageKey = getStorageKey(customerId)
    const storedData = localStorage.getItem(storageKey)
    if (storedData) {
      return JSON.parse(storedData)
    }
    return null
  } catch (error) {
    console.error('Error al leer de localStorage:', error)
    return null
  }
}

/**
 * Obtiene solo los datos del cliente sin el timestamp
 * @param {string} customerId - ID del cliente
 * @returns {object|null} Datos del cliente o null si no existen
 */
export const getCustomerData = (customerId) => {
  const stored = getCustomerInfoFromStorage(customerId)
  return stored ? stored.data : null
}

/**
 * Elimina la información del cliente de localStorage
 * @param {string} customerId - ID del cliente
 */
export const removeCustomerInfoFromStorage = (customerId) => {
  try {
    const storageKey = getStorageKey(customerId)
    localStorage.removeItem(storageKey)
    console.log('Datos eliminados de localStorage para customer:', customerId)
    return true
  } catch (error) {
    console.error('Error al eliminar de localStorage:', error)
    return false
  }
}

/**
 * Verifica si hay datos almacenados para un cliente
 * @param {string} customerId - ID del cliente
 * @returns {boolean} true si hay datos almacenados
 */
export const hasStoredCustomerInfo = (customerId) => {
  const stored = getCustomerInfoFromStorage(customerId)
  return stored !== null && stored.data !== undefined
}










