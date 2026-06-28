import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'polylingo-learn-auth';

export function middleware(request: NextRequest) {
  const accessCode = process.env.LEARN_ACCESS_CODE;
  if (!accessCode) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname === '/learn/access') return NextResponse.next();

  if (pathname.startsWith('/learn')) {
    const cookie = request.cookies.get(COOKIE_NAME);
    if (cookie?.value === accessCode) return NextResponse.next();

    return NextResponse.redirect(new URL('/learn/access', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/learn', '/learn/:path*'],
};
