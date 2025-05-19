// lib/axios.ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000' // 'http://192.168.100.72:5000'
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    
    if (token) {
      
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export default api
