import { Session } from '../entities/session.entity';

export interface SessionApi {
  getSessions(): Promise<Session[]>;
  getSessionsByUserId(userId: string): Promise<Session[]>;
  getSessionsByToken(token: string): Promise<Session[]>;
}
