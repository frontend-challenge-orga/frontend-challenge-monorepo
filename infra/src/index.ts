import { startExpressServer, configMiddleware, app } from '@config/express.configuration';
import { ChallengeSpi, SessionSpi } from '@monorepo/domain';
import { ChallengeInfraSpi } from '@spi/challenge.infra.spi';
import { ChallengeInfraService } from '@services/challenge.infra.service';
import { ChallengeController } from '@controllers/challenge.controller';

import prisma from '@config/prisma.configuration';
import { SessionInfraSpi } from '@spi/session.infra.spi';
import { SessionInfraService } from '@services/session.infra.service';
import { AuthMiddleware } from '@middlewares/auth.middleware';

export const APPLICATION_PORT = 8080;

const setupApplication = async () => {
  //Init SPI
  const challengeSpi: ChallengeSpi = new ChallengeInfraSpi(prisma);
  const sessionSpi: SessionSpi = new SessionInfraSpi(prisma);

  //Init Services
  const challengeInfraService: ChallengeInfraService = new ChallengeInfraService(challengeSpi);
  const sessionInfraService: SessionInfraService = new SessionInfraService(sessionSpi);

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
