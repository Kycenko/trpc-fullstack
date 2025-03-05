import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request })

	if (!token && !request.nextUrl.pathname.startsWith('/auth'))
		return NextResponse.redirect(new URL('/auth/sign-in', request.url))
	if (token && request.nextUrl.pathname.startsWith('/auth'))
		return NextResponse.redirect(new URL('/', request.url))

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
