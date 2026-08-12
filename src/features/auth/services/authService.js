/**
 * Servicio de autenticación.
 *
 * MODO ACTUAL: Mock (datos locales, sin backend).
 * MIGRACIÓN JWT:
 *   1. Configurar VITE_API_URL en .env.production
 *   2. El apiClient detectará isApiAvailable() y hará llamadas HTTP
 *   3. Login → POST /api/auth/login → recibe { accessToken, user }
 *   4. Register → POST /api/auth/register → recibe { accessToken, user }
 *   5. Tokens se manejan via tokenService (apiClient.js)
 *
 * Backend requerido (Express/Supabase):
 *   - POST /api/auth/login  → bcrypt.compare(password, hash), generar JWT
 *   - POST /api/auth/register → bcrypt.hash(password), crear user, generar JWT
 *   - POST /api/auth/refresh → validar refresh token, generar nuevo access token
 *   - GET  /api/auth/me → validar JWT, retornar user data
 */
import httpClient, { isApiAvailable, tokenService } from '../../../shared/services/apiClient'
import { mockUsers } from '../../../shared/data/mockData'

const AUTH_KEY = 'creeser_user'

const sleep = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const authService = {
  async login(email, password) {
    // Cuando haya backend, usar HTTP
    if (isApiAvailable()) {
      const { data } = await httpClient.post('/auth/login', { email, password })
      tokenService.setAccessToken(data.accessToken)
      localStorage.setItem(AUTH_KEY, JSON.stringify(data.user))
      return data.user
    }

    // Mock: búsqueda local
    await sleep()
    const user = mockUsers.find(
      u => u.email === email && u.password === password
    )

    if (!user) {
      throw new Error('Credenciales inválidas')
    }

    const { password: _, ...userWithoutPassword } = user
    localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword))
    return userWithoutPassword
  },

  async register(userData) {
    if (isApiAvailable()) {
      const { data } = await httpClient.post('/auth/register', userData)
      tokenService.setAccessToken(data.accessToken)
      localStorage.setItem(AUTH_KEY, JSON.stringify(data.user))
      return data.user
    }

    // Mock: registro local
    await sleep()
    const existingUser = mockUsers.find(u => u.email === userData.email)
    if (existingUser) {
      throw new Error('El email ya está registrado')
    }

    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: 'member',
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      memberSince: new Date().toISOString().split('T')[0],
      belt: 'Cinturón Blanco'
    }

    mockUsers.push(newUser)

    const { password: _, ...userWithoutPassword } = newUser
    localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword))
    return userWithoutPassword
  },

  logout() {
    tokenService.clearTokens()
    localStorage.removeItem(AUTH_KEY)
  },

  getCurrentUser() {
    const savedUser = localStorage.getItem(AUTH_KEY)
    return savedUser ? JSON.parse(savedUser) : null
  },

  async updateProfile(userId, updates) {
    if (isApiAvailable()) {
      const { data } = await httpClient.put(`/users/${userId}`, updates)
      localStorage.setItem(AUTH_KEY, JSON.stringify(data))
      return data
    }

    // Mock: actualización local
    await sleep()
    const currentUser = this.getCurrentUser()

    if (!currentUser || currentUser.id !== userId) {
      throw new Error('No autorizado')
    }

    const updatedUser = { ...currentUser, ...updates }
    localStorage.setItem(AUTH_KEY, JSON.stringify(updatedUser))
    return updatedUser
  }
}
