import axios from 'axios'

// Create an instance of axios
const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:5000/api', // Set your base URL here
  timeout: 10000,
})

// Set up request interceptor to add authorization header
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  },
)

// Helper function to handle API requests
const handleResponse = response => response.data
const handleError = error => {
  console.error('API call failed:', error)
  return Promise.reject(error.response ? error.response.data : error)
}

// REST API Utility Functions

const apiUtils = {
  get: async url => {
    try {
      const response = await apiClient.get(url)
      return handleResponse(response)
    } catch (error) {
      return handleError(error)
    }
  },

  post: async (url, data) => {
    try {
      const response = await apiClient.post(url, data)
      return handleResponse(response)
    } catch (error) {
      return handleError(error)
    }
  },

  put: async (url, data) => {
    try {
      const response = await apiClient.put(url, data)
      return handleResponse(response)
    } catch (error) {
      return handleError(error)
    }
  },

  delete: async url => {
    try {
      const response = await apiClient.delete(url)
      return handleResponse(response)
    } catch (error) {
      return handleError(error)
    }
  },
}

export default apiUtils
