import { ChallengeApi, ChallengeDomainService, ChallengeRepository, ChallengeSpi } from '@package/domain';

export class ChallengeInfraService implements ChallengeApi {
  private challengeApi: ChallengeApi;

  constructor(challengeRepository: ChallengeRepository) {
    this.challengeApi = new ChallengeDomainService(challengeRepository);
  }

  getChallenges() {
    return this.challengeApi.getChallenges();
  }
}
