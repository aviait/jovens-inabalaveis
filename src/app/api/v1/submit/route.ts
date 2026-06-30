import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { submissionSchema } from '@/lib/schemas';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { code: 'INVALID_JSON', message: 'Corpo da requisição inválido.' },
      { status: 400 },
    );
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { code: 'VALIDATION_ERROR', message: 'Dados inválidos.', details: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { fullName, birthDate, church, topics, freeMealSessions, mealScenario } = parsed.data;

  try {
    const submission = await db.submission.create({
      data: {
        fullName,
        birthDate: new Date(birthDate),
        church,
        topics,
        freeMealSessions,
        mealScenario,
      },
      select: { id: true },
    });

    return NextResponse.json({ id: submission.id }, { status: 201 });
  } catch (err) {
    console.error(JSON.stringify({ level: 'error', event: 'submission.create.failed', err: String(err) }));
    return NextResponse.json(
      { code: 'INTERNAL_ERROR', message: 'Erro ao salvar inscrição.' },
      { status: 500 },
    );
  }
}
