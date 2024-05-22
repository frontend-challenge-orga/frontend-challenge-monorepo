export const CHALLENGE_ENDPOINTS = {
  GET_CHALLENGES: '/challenges',
  CREATE_CHALLENGE: '/challenges/create',
} as const;

export const USER_ENDPOINTS = {
  GET_USERS: '/users',
  GET_USER: '/users/:id',
  UPDATE_USER: '/users/update/:id',
  DELETE_USER: '/users/delete/:id',
};

export const PAYMENT_ENDPOINTS = {
  CREATE_CHECKOUT_SESSION: '/create-checkout-session',
};

export const SUBSCRIPTION_ENDPOINTS = {
  SUSPEND_SUBSCRIPTION: '/subscription/suspend',
};

export const PROTECTED_ENDPOINTS = {
  AUTHENTICATED_ROUTE: '/authenticated-route',
  ADMIN_ROUTE: '/admin-route',
};
