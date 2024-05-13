import { SessionApi, SessionDomainService, SessionSpi } from '@monorepo/domain';

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
}
