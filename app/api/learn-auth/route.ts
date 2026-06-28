import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'polylingo-learn-auth';

export async function POST(request: NextRequest) {
  const accessCode = process.env.LEARN_ACCESS_CODE;
  if (!accessCode) {
    return NextResponse.json({ ok: true });
  }

  const body = (await request.json()) as { code?: string };
  if (body.code !== accessCode) {
    return NextResponse.json({ error: 'Invalid code' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, accessCode, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });
  return response;
}
