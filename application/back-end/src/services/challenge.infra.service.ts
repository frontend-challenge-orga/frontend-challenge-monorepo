import { ChallengeDomainService, type IChallengeRepository } from '@package/domain';

export class ChallengeInfraService implements IChallengeRepository {
  private challengeRepository: IChallengeRepository;

  constructor(challengeRepository: IChallengeRepository) {
    this.challengeRepository = new ChallengeDomainService(challengeRepository);
  }

  getChallenges() {
    return this.challengeRepository.getChallenges();
  }
}
