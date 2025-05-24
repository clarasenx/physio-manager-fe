'use server'

import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

type JwtPayload = {
  exp: number
}

export async function login(data: { token: string }) {
  const cookieStore = await cookies()
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  const { payload } = await jwtVerify<JwtPayload>(data.token, secret)

  const maxAge = payload.exp - Math.floor(Date.now() / 1000)

  cookieStore.set('token', data.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: maxAge > 0 ? maxAge : 0,
  })
}