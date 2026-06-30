import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

async function requireSuperAdmin() {
  const session = await getSession();
  if (!session.isAdmin || session.role !== 'super_admin') {
    return { error: NextResponse.json({ code: 'FORBIDDEN', message: 'Acesso restrito.' }, { status: 403 }), session: null };
  }
  return { error: null, session };
}

const updateSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  role: z.enum(['super_admin', 'congregacao']).optional(),
  church: z.string().min(2).max(120).nullable().optional(),
  password: z.string().min(6).optional(),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireSuperAdmin();
  if (error) return error;

  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ code: 'INVALID_JSON', message: 'Corpo inválido.' }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ code: 'VALIDATION_ERROR', message: 'Dados inválidos.' }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  if (parsed.data.name) data.name = parsed.data.name;
  if (parsed.data.role) data.role = parsed.data.role;
  if ('church' in parsed.data) data.church = parsed.data.church ?? null;
  if (parsed.data.password) data.passwordHash = await hashPassword(parsed.data.password);

  const user = await db.user.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true, role: true, church: true },
  });

  return NextResponse.json(user);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error, session } = await requireSuperAdmin();
  if (error) return error;

  const { id } = await params;

  if (session!.userId === id) {
    return NextResponse.json({ code: 'CONFLICT', message: 'Não é possível remover o próprio usuário.' }, { status: 409 });
  }

  await db.user.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
