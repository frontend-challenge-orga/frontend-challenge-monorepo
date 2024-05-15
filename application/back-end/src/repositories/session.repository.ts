import type { ISessionRepository } from '@package/domain';
import type { PrismaClient } from '@prisma/client';

export class SessionRepository implements ISessionRepository {
  private repository: PrismaClient;

  constructor(dataSource: PrismaClient) {
    this.repository = dataSource;
  }

  async getSessions() {
    return this.repository.session.findMany();
  }

  async getSessionsByUserId(userId: string) {
    return this.repository.session.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async getSessionsByToken(token: string) {
    return this.repository.session.findMany({
      where: {
        sessionToken: token,
      },
    });
  }
}
