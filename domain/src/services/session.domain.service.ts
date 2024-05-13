import { SessionApi } from '../api/session.api';
import { SessionSpi } from '../spi/session.spi';
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
}
