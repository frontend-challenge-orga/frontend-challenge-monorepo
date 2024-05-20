import type { Session } from '../entities';
import type { ISessionRepository } from '../repositories';

export interface ISessionService {
  getSessions(): Promise<Session[]>;
  getSessionsByUserId(userId: string): Promise<Session[]>;
  getSessionsByToken(token: string): Promise<Session[]>;
}
export class SessionService implements ISessionService {
  constructor(private sessionRepository: ISessionRepository) {}

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
