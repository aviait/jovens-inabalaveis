import { NextRequest, NextResponse } from 'next/server';

import { getSession } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
  return NextResponse.next();
}

// protege /admin e sub-rotas, exceto /admin/login
export const config = {
  matcher: ['/admin/((?!login).*)'],
};
