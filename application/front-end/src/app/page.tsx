import { challengeRepository } from '#/repositories/challenge.repository';
import { ChallengeService } from '@domain/services';

export default async function HomePage() {
  const challenges = await new ChallengeService(challengeRepository).getChallenges();

  return <main></main>;
}
