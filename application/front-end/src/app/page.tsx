import { challengeRepository } from '#/repositories/challenge.repository';
import { ChallengeService } from '@domain/services';
import { LoginButton } from '#/views/modules/authentication/login.button';
import { getServerAuthSession } from '#/config/server/auth';
import { LogoutButton } from '#/views/modules/authentication/logout.button';

export default async function HomePage() {
  const challenges = await new ChallengeService(challengeRepository).getChallenges();
  const session = await getServerAuthSession();

  return (
    <main>
      <p>{session?.user.email}</p>
      <LoginButton />
      <LogoutButton />
    </main>
  );
}
