import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { verifyPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_ATTEMPTS) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { code: 'RATE_LIMITED', message: 'Muitas tentativas. Aguarde 15 minutos.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ code: 'INVALID_JSON', message: 'Corpo inválido.' }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ code: 'VALIDATION_ERROR', message: 'Dados inválidos.' }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return NextResponse.json({ code: 'UNAUTHORIZED', message: 'E-mail ou senha incorretos.' }, { status: 401 });
  }

  const session = await getSession();
  session.isAdmin = true;
  session.userId = user.id;
  session.role = user.role;
  session.church = user.church ?? undefined;
  await session.save();

  return NextResponse.json({ ok: true });
}
