import { startExpressServer, configMiddleware } from '@config/express.configuration';
import { ChallengeRepository } from '@repositories/challenge.repository';
import { ChallengeInfraService } from '@services/challenge.infra.service';
import { ChallengeController } from '@controllers/challenge.controller';

import prisma from '@config/prisma.configuration';
import { SessionRepository } from '@repositories/session.repository';
import { SessionInfraService } from '@services/session.infra.service';
import { AuthMiddleware } from '@middlewares/auth.middleware';

export const APPLICATION_PORT = 8080;

const setupApplication = async () => {
  // Init Repositories
  const challengeRepository = new ChallengeRepository(prisma);
  const sessionRepository = new SessionRepository(prisma);

  //Init Services
  const challengeInfraService: ChallengeInfraService = new ChallengeInfraService(challengeRepository);
  const sessionInfraService: SessionInfraService = new SessionInfraService(sessionRepository);

  //Config Middleware
  const authMiddleware = new AuthMiddleware(sessionInfraService);
  await configMiddleware(authMiddleware);

  //Init Controllers
  ChallengeController(challengeInfraService);

  await startExpressServer(APPLICATION_PORT);
};

setupApplication().then(() => {
  console.log(`Server running on port ${APPLICATION_PORT}`);
});
