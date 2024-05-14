import { SessionApi, SessionDomainService, SessionSpi } from '@package/domain';

export class SessionInfraService implements SessionApi {
  private sessionApi: SessionApi;

  constructor(sessionSpi: SessionSpi) {
    this.sessionApi = new SessionDomainService(sessionSpi);
  }

  getSessions() {
    return this.sessionApi.getSessions();
  }

  getSessionsByUserId(userId: string) {
    return this.sessionApi.getSessionsByUserId(userId);
  }

  getSessionsByToken(token: string) {
    return this.sessionApi.getSessionsByToken(token);
  }
}
