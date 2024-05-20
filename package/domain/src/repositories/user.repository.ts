import type { User } from '../entities';
import type { Role } from '../entities';

export interface IUserRepository {
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  getUserRole(id: string): Promise<Role>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
