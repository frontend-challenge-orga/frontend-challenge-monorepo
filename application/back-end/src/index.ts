import prisma from '@config/prisma.configuration';
import { stripe } from '@config/stripe.configuration';
import { startExpressServer, configMiddleware, APPLICATION_PORT } from '@config/express.configuration';

import { UserRepository } from '@repositories/user.repository';
import { SessionRepository } from '@repositories/session.repository';
import { ChallengeRepository } from '@repositories/challenge.repository';
import { StripeRepository } from '@repositories/stripe.repository';
import { SubscriptionRepository } from '@repositories/subscription.repository';

import { setupUserController } from '@controllers/user.controller';
import { setupChallengeController } from '@controllers/challenge.controller';
import { setupPaymentController } from '@controllers/payment.controller';
import { setupSubscriptionController } from '@controllers/subscription.controller';
import { setupErrorHandler } from '@middlewares/error-handler.middleware';

import { AuthMiddleware } from '@middlewares/auth.middleware';

import { UserService, SessionService, ChallengeService, PaymentService, SubscriptionService } from '@package/domain';

import type {
  IUserService,
  ISessionService,
  IChallengeService,
  IPaymentService,
  ISubscriptionService,
} from '@package/domain';

const setupApplication = async () => {
  // Init Repositories
  const challengeRepository = new ChallengeRepository(prisma);
  const sessionRepository = new SessionRepository(prisma);
  const userRepository = new UserRepository(prisma);
  const stripeRepository = new StripeRepository(stripe);
  const subscriptionRepository = new SubscriptionRepository(prisma);

  //Init Services
  const challengeService: IChallengeService = new ChallengeService(challengeRepository);
  const sessionInfraService: ISessionService = new SessionService(sessionRepository);
  const userInfraService: IUserService = new UserService(userRepository);
  const paymentService: IPaymentService = new PaymentService(stripeRepository);
  const subscriptionService: ISubscriptionService = new SubscriptionService(subscriptionRepository);

  //Config Middleware
  const authMiddleware = new AuthMiddleware(sessionInfraService, userInfraService);
  await configMiddleware(authMiddleware);

  //Init Controllers
  setupChallengeController(challengeService);
  setupUserController(userInfraService);
  setupPaymentController(paymentService);
  setupSubscriptionController(subscriptionService);

  //Error Handler Middleware
  setupErrorHandler();

  await startExpressServer(APPLICATION_PORT);
};

setupApplication().then(() => {
  console.log(`Server running on port ${APPLICATION_PORT}`);
});
