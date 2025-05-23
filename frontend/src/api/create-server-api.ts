import axios from 'axios'
import { cookies } from 'next/headers'

export async function createServerApi() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
  })

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  return api
}