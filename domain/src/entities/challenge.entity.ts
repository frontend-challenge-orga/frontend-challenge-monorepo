export class Challenge {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly language: Language;
  readonly difficulty: Difficulty;
  readonly points: number;
  readonly brief: string;
  readonly tips: string;
  readonly assets_presentation: string[];
  readonly premium: boolean;
  readonly starter_code_path_file: string;
  readonly starter_figma_path_file: string;
  readonly createdById: string;

  constructor(
    id: string,
    name: string,
    slug: string,
    description: string,
    language: Language,
    difficulty: Difficulty,
    points: number,
    brief: string,
    tips: string,
    assets_presentation: string[],
    premium: boolean,
    starter_code_path_file: string,
    starter_figma_path_file: string,
    createdById: string,
  ) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.language = language;
    this.difficulty = difficulty;
    this.points = points;
    this.brief = brief;
    this.tips = tips;
    this.assets_presentation = assets_presentation;
    this.premium = premium;
    this.starter_code_path_file = starter_code_path_file;
    this.starter_figma_path_file = starter_figma_path_file;
    this.createdById = createdById;
  }
}

export type Difficulty = 'NEWBIE' | 'JUNIOR' | 'INTERMEDIATE' | 'ADVANCED' | 'GURU';

export type Language = 'HTML_CSS' | 'JS' | 'API';
