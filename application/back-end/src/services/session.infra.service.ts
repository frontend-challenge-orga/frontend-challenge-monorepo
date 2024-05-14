import { SessionDomainService, type ISessionRepository } from '@package/domain';

export class SessionInfraService implements ISessionRepository {
  private sessionRepository: ISessionRepository;

  constructor(sessionRepository: ISessionRepository) {
    this.sessionRepository = new SessionDomainService(sessionRepository);
  }

  getSessions() {
    return this.sessionRepository.getSessions();
  }

  getSessionsByUserId(userId: string) {
    return this.sessionRepository.getSessionsByUserId(userId);
  }

  getSessionsByToken(token: string) {
    return this.sessionRepository.getSessionsByToken(token);
  }
}
