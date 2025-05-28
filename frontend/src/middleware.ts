import { jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const publicPaths = [ '/login', '/recuperar-senha' ]

async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value

  const isPublic = publicPaths.includes(path)
  const isAuthPage = path === '/login'

  const tokenPayload = token ? await verifyToken(token) : null


  // Se o usuário NÃO está autenticado e tenta acessar página protegida → redireciona pro login
  if (!tokenPayload && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se o usuário ESTÁ autenticado e tenta acessar /login → redireciona para /dashboard  
  if (tokenPayload && (isAuthPage || path === "/")) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Em todos os outros casos, segue normalmente
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}
