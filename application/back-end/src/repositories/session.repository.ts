import type { ISessionRepository } from '@package/domain';
import type { PrismaClient } from '@prisma/client';

export class SessionRepository implements ISessionRepository {
  private sessionRepository: PrismaClient;

  constructor(dataSource: PrismaClient) {
    this.sessionRepository = dataSource;
  }

  async getSessions() {
    return this.sessionRepository.session.findMany();
  }

  async getSessionsByUserId(userId: string) {
    return this.sessionRepository.session.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async getSessionsByToken(token: string) {
    return this.sessionRepository.session.findMany({
      where: {
        sessionToken: token,
      },
    });
  }
}
