import type { IUserRepository, User } from '@package/domain';
import type { PrismaClient } from '@prisma/client';

export class UserRepository implements IUserRepository {
  private userRepository: PrismaClient;

  constructor(dataSource: PrismaClient) {
    this.userRepository = dataSource;
  }

  async getUsers() {
    return this.userRepository.user.findMany();
  }

  async getUserById(id: string) {
    return this.userRepository.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserRole(id: string) {
    const user = await this.getUserById(id);
    return user.role;
  }

  async updateUser(user: User) {
    return this.userRepository.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
  }

  async deleteUser(id: string) {
    this.userRepository.user.delete({
      where: {
        id,
      },
    });
  }
}
