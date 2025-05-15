'use server'

import { cookies } from 'next/headers'

export async function login(data: { token: string }) {
  const cookieStore = await cookies()

  cookieStore.set('token', data.token)
}