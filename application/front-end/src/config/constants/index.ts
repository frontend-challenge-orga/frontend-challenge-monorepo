export const URL = {
  LANDING: "/",
  CHALLENGES: "/challenges",
  SOLUTIONS: "/solutions",
  SUBSCRIPTION: "/subscription",
  DASHBOARD: "/dashboard",
  DASHBOARD_CHALLENGES: "/dashboard/challenges",
  DASHBOARD_CHALLENGES_CREATE: "/dashboard/challenges/create",
  DASHBOARD_SUBSCRIPTIONS: "/dashboard/subscriptions",
};

export const NAVIGATION = [
  { name: "Challenges", href: URL.CHALLENGES },
  { name: "Solutions", href: URL.SOLUTIONS },
  { name: "Unlock Pro", href: URL.SUBSCRIPTION },
];

export const ROLE = {
  USER: "USER",
  COLLABORATOR: "COLLABORATOR",
  ADMIN: "ADMIN",
};

export const CHALLENGE_PRICE = 1;
export const DESIGN_PRICE = 1;

export const LANGUAGE = ["HTML_CSS", "JS", "API"] as const;

export const FILE_TYPE = {
  STARTER: "STARTER",
  FIGMA: "FIGMA",
} as const;

export const DIFFICULTY = ["NEWBIE", "JUNIOR", "INTERMEDIATE", "ADVANCED", "GURU"] as const;

export const PROTECTED_ROUTE_ERROR = {
  ADMIN: "User is not an admin or not logged in. Redirecting to /.",
  PROFILE: "User is not logged in. Redirecting to /.",
};

export const ACTION_ERROR = {
  ADMIN: "You are not authorized to perform this action.",
  USER: "You are not logged in.",
  CREATE_CHECKOUT_SESSION: "An error occurred while creating the checkout session. Contact support.",
  CANCEL_SUBSCRIPTION: "An error occurred while canceling the subscription. Contact support.",
  CREATE_CHALLENGE: "An error occurred while creating the challenge.",
  START_CHALLENGE: "An error occurred while starting the challenge.",
  EDIT_CHALLENGE: "An error occurred while editing the challenge",
  INSUFFICIENT_CHALLENGE_CREDITS: "You don't have enough credit to start the challenge.",
  INSUFFICIENT_DESIGN_CREDITS: "You don't have enough credit to download the design file.",
  REMOVE_CHALLENGE: "An error occurred while removing the challenge.",
  SUBMIT_CHALLENGE_SOLUTION: "An error occurred while submitting the challenge solution.",
  SUBMIT_FEEDBACK: "An error occurred while submitting the feedback.",
  DOWNLOAD_FILE: "An error occurred while downloading the file.",
  USER_HAS_NO_SUBSCRIPTION: "User has no subscription.",
  USER_HAS_STARTED_CHALLENGE: "User has already started the challenge.",
  USER_NOT_LOGGED_IN: "User is not logged in.",
  FILE_NOT_FOUND: "File not found.",
  PREVIEW_CHECK: "Click the preview button before submitting",
};

export const CHALLENGE_TYPE = {
  FREE: "FREE",
  PREMIUM: "PREMIUM",
};

export const FILTER_TYPE_PARAMS = {
  FREE: "free",
  PREMIUM: "premium",
};

export const FILTER_TYPE_LABELS = {
  FREE: "Free",
  PREMIUM: "Premium",
};

export const FILTER_DIFFICULTY_PARAMS = {
  NEWBIE: "newbie",
  JUNIOR: "junior",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
  GURU: "guru",
};

export const FILTER_DIFFICULTY_LABELS = {
  NEWBIE: "Newbie",
  JUNIOR: "Junior",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  GURU: "Guru",
};

export const FILTER_LANGUAGE_PARAMS = {
  HTML_CSS: "html_css",
  JS: "js",
  API: "api",
};

export const FILTER_LANGUAGE_LABELS = {
  HTML_CSS: "HTML & CSS",
  JS: "JavaScript",
  API: "API",
};
