import type { Session } from '../entities/session.entity';
import type { ISessionRepository } from '../repositories';

export class SessionDomainService {
  constructor(private sessionRepository: ISessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async getSessions(): Promise<Session[]> {
    return this.sessionRepository.getSessions();
  }

  async getSessionsByUserId(userId: string): Promise<Session[]> {
    return this.sessionRepository.getSessionsByUserId(userId);
  }

  async getSessionsByToken(token: string): Promise<Session[]> {
    return this.sessionRepository.getSessionsByToken(token);
  }
}
