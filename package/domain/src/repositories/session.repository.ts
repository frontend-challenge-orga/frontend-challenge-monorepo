import type { Session } from '../entities';

export interface ISessionRepository {
  getSessions(): Promise<Session[]>;
  getSessionsByUserId(userId: string): Promise<Session[]>;
  getSessionsByToken(token: string): Promise<Session[]>;
}
