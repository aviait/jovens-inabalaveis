import { z } from 'zod';

export const CHURCHES = [
  'VALENTINA 1',
  'VALENTINA 2',
  'SANTA BÁRBARA',
  'FREI DAMIÃO',
  'BARRA DE GRAMAME',
  'CIDADE MARAVILHOSA',
  'NOVA MANGABEIRA',
  'PARATIBE 1',
  'PARATIBE 2',
  'MARIBONDO',
  'PONTA DE GRAMAME',
  'GRAVATÁ',
  'PLANÍCIE DOURADA',
  'GUAXIMDUBA',
  'VALE DO SONHO',
  'MUSSUMAGO',
  'PARQUE DO SOL 1',
  'PARQUE DO SOL 2',
  'LITORAL SUL 1',
  'LITORAL SUL 2',
] as const;

export const TOPICS = [
  'O que é uma ideologia e como ela afeta a fé',
  'A falácia do Materialismo Histórico',
  'A falácia do Relativismo Ético-Moral',
  'A falácia da Ideologia de Gênero',
  'A falácia da Teologia Progressista',
  'A falácia do Humanismo',
  'A falácia da Teoria Darwiniana',
  'A falácia do Pragmatismo',
  'A falácia do Ateísmo',
  'A falácia da Teoria do Deísmo',
  'A falácia da Teologia da Prosperidade',
  'A falácia do Triunfalismo',
  'O discernimento do cristão na atualidade',
] as const;

export const SESSIONS = ['Manhã', 'Tarde', 'Noite'] as const;

export const MEAL_SCENARIOS = [
  'no_impact_r10',
  'no_impact_r20',
  'no_impact_r40',
  'need_support',
  'own_meal',
  'skip_meal_sessions',
] as const;

export const MEAL_SCENARIO_LABELS: Record<(typeof MEAL_SCENARIOS)[number], string> = {
  no_impact_r10: 'Não afetaria — contribuiria com R$ 10,00',
  no_impact_r20: 'Não afetaria — contribuiria com até R$ 20,00',
  no_impact_r40: 'Não afetaria — contribuiria com até R$ 40,00',
  need_support: 'Precisaria de apoio — não posso contribuir financeiramente',
  own_meal: 'Faria minha própria refeição',
  skip_meal_sessions: 'Afetaria — participaria apenas dos turnos sem refeição',
};

export const submissionSchema = z.object({
  fullName: z.string().min(3).max(120),
  birthDate: z.string().date(),
  church: z.string().min(2).max(120),
  topics: z.array(z.enum(TOPICS)).min(1).max(6),
  freeMealSessions: z.array(z.enum(SESSIONS)).min(1),
  mealScenario: z.enum(MEAL_SCENARIOS),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;
