import { SessionApi } from '../api';
import { SessionSpi } from '../spi';
import { Session } from '../entities/session.entity';

export class SessionDomainService implements SessionApi {
  constructor(private sessionSpi: SessionSpi) {
    this.sessionSpi = sessionSpi;
  }

  async getSessions(): Promise<Session[]> {
    return this.sessionSpi.index();
  }

  async getSessionsByUserId(userId: string): Promise<Session[]> {
    return this.sessionSpi.findByUserId(userId);
  }

  async getSessionsByToken(token: string): Promise<Session[]> {
    return this.sessionSpi.findByToken(token);
  }
}
