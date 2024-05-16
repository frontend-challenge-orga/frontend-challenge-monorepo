import { Language, Difficulty } from '@domain/entities/challenge.entity';

export type ChallengeDTO = {
  id: string;
  name: string;
  slug: string;
  description: string;
  language: Language;
  difficulty: Difficulty;
  points: number;
  brief: string;
  tips: string;
  assets_presentation: string[];
  premium: boolean;
  starter_code_path_file: string;
  starter_figma_path_file: string;
  createdById: string;
};
