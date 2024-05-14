import { ChallengeApi, ChallengeDomainService, ChallengeSpi } from '@package/domain';

export class ChallengeInfraService implements ChallengeApi {
  private challengeApi: ChallengeApi;

  constructor(challengeSpi: ChallengeSpi) {
    this.challengeApi = new ChallengeDomainService(challengeSpi);
  }

  getChallenges() {
    return this.challengeApi.getChallenges();
  }
}
