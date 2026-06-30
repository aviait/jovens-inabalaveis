import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

async function requireSuperAdmin() {
  const session = await getSession();
  if (!session.isAdmin || session.role !== 'super_admin') {
    return NextResponse.json({ code: 'FORBIDDEN', message: 'Acesso restrito.' }, { status: 403 });
  }
  return null;
}

export async function GET() {
  const err = await requireSuperAdmin();
  if (err) return err;

  const users = await db.user.findMany({
    orderBy: { createdAt: 'asc' },
    select: { id: true, name: true, email: true, role: true, church: true, createdAt: true },
  });
  return NextResponse.json(users);
}

const createSchema = z
  .object({
    name: z.string().min(2).max(120),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['super_admin', 'congregacao']),
    church: z.string().min(2).max(120).nullable().optional(),
  })
  .refine((d) => d.role === 'super_admin' || !!d.church, {
    message: 'Congregação é obrigatória para o papel Congregação.',
    path: ['church'],
  });

export async function POST(req: NextRequest) {
  const err = await requireSuperAdmin();
  if (err) return err;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ code: 'INVALID_JSON', message: 'Corpo inválido.' }, { status: 400 });
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { code: 'VALIDATION_ERROR', message: parsed.error.errors[0]?.message ?? 'Dados inválidos.' },
      { status: 400 },
    );
  }

  const existing = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return NextResponse.json({ code: 'CONFLICT', message: 'E-mail já cadastrado.' }, { status: 409 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const user = await db.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      role: parsed.data.role,
      church: parsed.data.church ?? null,
    },
    select: { id: true, name: true, email: true, role: true, church: true, createdAt: true },
  });

  return NextResponse.json(user, { status: 201 });
}
