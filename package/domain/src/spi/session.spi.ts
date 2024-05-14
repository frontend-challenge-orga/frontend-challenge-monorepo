import { Session } from '../entities/session.entity';

export interface SessionSpi {
  index(): Promise<Session[]>;
  findByUserId(userId: string): Promise<Session[]>;
  findByToken(token: string): Promise<Session[]>;
}
