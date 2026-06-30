import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  isAdmin: boolean;
  userId?: string;
  role?: string;   // "super_admin" | "congregacao"
  church?: string; // apenas role congregacao
}

const sessionOptions: SessionOptions = {
  cookieName: 'ji_session',
  password: process.env.SESSION_SECRET!,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8h
  },
};

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}
