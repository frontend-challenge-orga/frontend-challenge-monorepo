import { startExpressServer, configMiddleware } from '@config/express.configuration';
import { ChallengeRepository } from '@repositories/challenge.repository';
import { ChallengeController } from '@controllers/challenge.controller';
import prisma from '@config/prisma.configuration';
import { SessionRepository } from '@repositories/session.repository';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { IChallengeService, ChallengeService, ISessionService, SessionService } from '@package/domain';

export const APPLICATION_PORT = 8080;

const setupApplication = async () => {
  // Init Repositories
  const challengeRepository = new ChallengeRepository(prisma);
  const sessionRepository = new SessionRepository(prisma);

  //Init Services
  const challengeService: IChallengeService = new ChallengeService(challengeRepository);
  const sessionInfraService: ISessionService = new SessionService(sessionRepository);

  //Config Middleware
  const authMiddleware = new AuthMiddleware(sessionInfraService);
  await configMiddleware(authMiddleware);

  //Init Controllers
  ChallengeController(challengeService);

  await startExpressServer(APPLICATION_PORT);
};

setupApplication().then(() => {
  console.log(`Server running on port ${APPLICATION_PORT}`);
});
