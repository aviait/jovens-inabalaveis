import ExcelJS from 'exceljs';
import { db } from '@/lib/db';
import { MEAL_SCENARIO_LABELS, type MEAL_SCENARIOS } from '@/lib/schemas';
import { getSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session.userId) {
    return new Response('Não autorizado', { status: 401 });
  }

  const isCongregacao = session.role === 'congregacao';
  const where = isCongregacao && session.church ? { church: session.church } : {};

  const submissions = await db.submission.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      createdAt: true,
      fullName: true,
      birthDate: true,
      church: true,
      topics: true,
      freeMealSessions: true,
      mealScenario: true,
    },
  });

  const wb = new ExcelJS.Workbook();
  wb.creator = 'Jovens Inabaláveis';

  const ws = wb.addWorksheet('Pré-cadastros');

  ws.columns = [
    { header: '#', key: 'seq', width: 6 },
    { header: 'Nome completo', key: 'fullName', width: 32 },
    { header: 'Data de nascimento', key: 'birthDate', width: 20 },
    { header: 'Congregação', key: 'church', width: 24 },
    { header: 'Temas de interesse', key: 'topics', width: 60 },
    { header: 'Turnos com refeição', key: 'sessions', width: 24 },
    { header: 'Cenário de refeição', key: 'mealScenario', width: 48 },
    { header: 'Data de cadastro', key: 'createdAt', width: 22 },
  ];

  // Estilo do cabeçalho
  ws.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF003D8F' } };
    cell.alignment = { vertical: 'middle', horizontal: 'left' };
  });
  ws.getRow(1).height = 22;

  const tz = 'America/Sao_Paulo';
  const fmtDate = (d: Date) => d.toLocaleDateString('pt-BR', { timeZone: tz });
  const fmtDateTime = (d: Date) => d.toLocaleString('pt-BR', { timeZone: tz });

  submissions.forEach((s, i) => {
    const row = ws.addRow({
      seq: submissions.length - i,
      fullName: s.fullName,
      birthDate: fmtDate(s.birthDate),
      church: s.church,
      topics: s.topics.join('; '),
      sessions: s.freeMealSessions.join(', '),
      mealScenario: MEAL_SCENARIO_LABELS[s.mealScenario as (typeof MEAL_SCENARIOS)[number]] ?? s.mealScenario,
      createdAt: fmtDateTime(s.createdAt),
    });
    row.getCell('topics').alignment = { wrapText: true };
  });

  // Congelar linha do cabeçalho
  ws.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];

  const buffer = await wb.xlsx.writeBuffer();

  const now = new Date().toLocaleDateString('pt-BR', { timeZone: tz }).replace(/\//g, '-');
  const filename = `jovens-inabalaveis-${now}.xlsx`;

  return new Response(buffer as ArrayBuffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
