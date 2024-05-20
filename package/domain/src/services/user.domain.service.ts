import type { User } from '../entities';
import type { Role } from '../entities';
import type { IUserRepository } from '../repositories';

export interface IUserService {
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  getUserRole(id: string): Promise<Role>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
}

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  async getUserRole(id: string): Promise<Role> {
    const user = await this.userRepository.getUserById(id);
    return user.role;
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.updateUser(user);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.deleteUser(id);
  }
}
