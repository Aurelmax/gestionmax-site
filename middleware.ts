// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''

  if (host === 'gestionmax.fr') {
    return NextResponse.redirect(`https://www.gestionmax.fr${request.nextUrl.pathname}`, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'], // ignore les fichiers statiques et _next
}