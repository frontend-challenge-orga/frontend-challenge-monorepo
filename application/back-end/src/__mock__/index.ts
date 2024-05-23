export const sessionServiceMock = {
  getSessions: jest.fn(),
  getSessionsByUserId: jest.fn(),
  getSessionsByToken: jest.fn().mockResolvedValue([]),
};

export const userServiceMock = {
  getUsers: jest.fn(),
  getUserById: jest.fn(),
  getUserRole: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

export const mockSubscriptionService = {
  getSubscription: jest.fn(),
  getSubscriptions: jest.fn(),
  createSubscription: jest.fn(),
  updateSubscription: jest.fn(),
  cancelSubscription: jest.fn(),
};

export const mockPaymentService = {
  createCheckoutSession: jest.fn(),
  getSubscription: jest.fn(),
  getSubscriptionStatus: jest.fn(),
  suspendSubscription: jest.fn(),
};

export const mockMailingService = {
  sendSuspendingSubscriptionEmail: jest.fn(),
};

export const reqMock = jest.fn();

export const resMock = {
  status: jest.fn(),
  json: jest.fn(),
};

export const nextMock = jest.fn();
