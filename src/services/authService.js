import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:4173',
  header: {
    'Content-Type': 'application/json',
  },
})

const authService = {
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      })

      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token)
      }

      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Login Failed')
      }
      throw new Error('Network error. Please try again later')
    }
  },

  async logout() {
    try {
      await apiClient.post('/auth/logout')
      localStorage.removeItem('authToken')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  },

  async register(email, password) {
    try {
      const response = await apiClient.post('/auth/register', {
        email,
        password,
      })
      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Registration failed')
      }
      throw new Error('Network error. Please try again later.')
    }
  },

  async getUser() {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('Not authenticated')
      }

      const response = await apiClient.get('/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || 'Failed to retrieve user information',
        )
      }
      throw new Error('Network error. Please try again later.')
    }
  },
}

export default authService
