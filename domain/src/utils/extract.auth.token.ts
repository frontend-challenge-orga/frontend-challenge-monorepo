export function extractAuthToken(authorizationHeader: string | undefined): string | null {
  if (!authorizationHeader) {
    return null;
  }

  return authorizationHeader.split(' ')[1];
}
