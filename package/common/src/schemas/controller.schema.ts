import * as z from 'zod';
import { DIFFICULTY, LANGUAGE } from '../constants';

export const createChallengeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  language: z.enum(LANGUAGE),
  difficulty: z.enum(DIFFICULTY),
  brief: z.string(),
  tips: z.string(),
  assets_presentation: z.string(),
  premium: z.boolean(),
  starter_code_path_file: z.string(),
  starter_figma_path_file: z.string(),
});

export const updateUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  image: z.string(),
  role: z.enum(['USER', 'COLLABORATOR', 'ADMIN']),
  points: z.number(),
});
