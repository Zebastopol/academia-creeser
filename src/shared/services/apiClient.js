/**
 * Cliente HTTP centralizado con abstracción para migrar entre proveedores.
 *
 * Fase actual: Mock (datos locales, sin HTTP real)
 * Fase siguiente: Supabase (@supabase/supabase-js)
 * Fase final: API REST propia (Express/Fastify)
 *
 * Los services importan apiClient en lugar de mockData directamente.
 * Al migrar a backend, solo se cambia la implementación interna aquí.
 */
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || ''

/**
 * Instancia de Axios preconfigurada.
 * Cuando exista backend, se usará para todas las llamadas HTTP.
 */
const httpClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Interceptor de request: inyecta token JWT cuando exista.
 * Se activará cuando se implemente autenticación real.
 */
httpClient.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

/**
 * Interceptor de response: maneja errores 401 (token expirado).
 * Futuro: intentar refresh del token antes de fallar.
 */
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      tokenService.clearTokens()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

/**
 * Servicio de gestión de tokens JWT.
 * Fase actual: stub (sin tokens reales).
 * Fase backend: almacenar access token en memoria, refresh en httpOnly cookie.
 */
export const tokenService = {
  _accessToken: null,

  getAccessToken() {
    return this._accessToken
  },

  setAccessToken(token) {
    this._accessToken = token
  },

  clearTokens() {
    this._accessToken = null
  },

  /**
   * Verifica si hay una sesión activa.
   * Futuro: decodificar JWT y verificar expiración.
   */
  isSessionValid() {
    return !!this._accessToken
  },
}

/**
 * Indica si la API backend está configurada y disponible.
 * Los services pueden usar esto para decidir si hacer llamadas HTTP
 * o usar datos mock como fallback.
 */
export const isApiAvailable = () => !!API_URL

export default httpClient
