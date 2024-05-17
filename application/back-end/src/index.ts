import prisma from '@config/prisma.configuration';
import { startExpressServer, configMiddleware } from '@config/express.configuration';
import { ChallengeRepository } from '@repositories/challenge.repository';
import { setupChallengeController } from '@controllers/challenge.controller';
import { SessionRepository } from '@repositories/session.repository';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import {
  IChallengeService,
  ChallengeService,
  ISessionService,
  SessionService,
  UserService,
  IUserService,
} from '@package/domain';
import { setupErrorHandler } from '@middlewares/error-handler.middleware';
import { UserRepository } from '@repositories/user.repository';
import { setupUserController } from '@controllers/user.controller';

export const APPLICATION_PORT = 8080;

const setupApplication = async () => {
  // Init Repositories
  const challengeRepository = new ChallengeRepository(prisma);
  const sessionRepository = new SessionRepository(prisma);
  const userRepository = new UserRepository(prisma);

  //Init Services
  const challengeService: IChallengeService = new ChallengeService(challengeRepository);
  const sessionInfraService: ISessionService = new SessionService(sessionRepository);
  const userInfraService: IUserService = new UserService(userRepository);

  //Config Middleware
  const authMiddleware = new AuthMiddleware(sessionInfraService, userInfraService);
  await configMiddleware(authMiddleware);

  //Init Controllers
  setupChallengeController(challengeService);
  setupUserController(userInfraService);

  //Error Handler Middleware
  setupErrorHandler();

  await startExpressServer(APPLICATION_PORT);
};

setupApplication().then(() => {
  console.log(`Server running on port ${APPLICATION_PORT}`);
});
