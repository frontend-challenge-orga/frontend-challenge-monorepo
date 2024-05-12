import { startExpressServer } from './configuration/express.configuration';
import { ChallengeSpi } from '@monorepo/domain';
import { ChallengeInfraSpi } from './spi/challenge.infra.spi';
import { ChallengeInfraService } from './services/challenge.infra.service';
import { ChallengeController } from './controllers/challenge.controller';

import prisma from './configuration/prisma.configuration';

export const APPLICATION_PORT = 8080;

const setupApplication = async () => {
  //Init SPI
  const challengeSpi: ChallengeSpi = new ChallengeInfraSpi(prisma);

  //Init Services
  const challengeInfraService: ChallengeInfraService = new ChallengeInfraService(challengeSpi);

  //Init Controllers
  ChallengeController(challengeInfraService);

  //Start Express Server
  await startExpressServer(APPLICATION_PORT);
};

setupApplication().then(() => {
  console.log(`Server running on port ${APPLICATION_PORT}`);
});
