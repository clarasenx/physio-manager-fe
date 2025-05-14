import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const publicPaths = [ '/login' ]

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value

  const isPublic = publicPaths.some(publicPath => path.startsWith(publicPath))
  const isAuthPage = path === '/login'

  // Se o usuário NÃO está autenticado e tenta acessar página protegida → redireciona pro login
  /* if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  } */

  // Se o usuário ESTÁ autenticado e tenta acessar /login → redireciona para /dashboard
  console.log(path);
  
  if (token && (isAuthPage || path === "/")) {
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
