import type { Challenge } from '@domain/entities';
import type { ChallengeDTO } from '#/dto/challenge.dto';
import type { IChallengeRepository, IHttpRepository } from '@domain/repositories';
import { CHALLENGE_ENDPOINTS } from '@package/common';
import { httpAxios } from '#/instances/axios.instance';

class ChallengeRepository implements IChallengeRepository {
  private readonly http: IHttpRepository;

  constructor(http: IHttpRepository) {
    this.http = http;
  }

  async getChallenges(): Promise<Challenge[]> {
    const challenges = await this.http.get<ChallengeDTO[]>(CHALLENGE_ENDPOINTS.GET_CHALLENGES);
    return challenges.map((challenge) => this.fromDTO(challenge));
  }

  async createChallenge(id: Challenge): Promise<Challenge> {
    const challenge = await this.http.post<ChallengeDTO>(CHALLENGE_ENDPOINTS.CREATE_CHALLENGE, { id });
    return this.fromDTO(challenge);
  }

  private fromDTO(dto: ChallengeDTO): Challenge {
    return {
      id: dto.id,
      name: dto.name,
      slug: dto.slug,
      description: dto.description,
      language: dto.language,
      difficulty: dto.difficulty,
      points: dto.points,
      brief: dto.brief,
      tips: dto.tips,
      assets_presentation: dto.assets_presentation,
      premium: dto.premium,
      starter_code_path_file: dto.starter_code_path_file,
      starter_figma_path_file: dto.starter_figma_path_file,
      createdById: dto.createdById,
    };
  }
}

const challengeRepository = new ChallengeRepository(httpAxios);

export { challengeRepository };
