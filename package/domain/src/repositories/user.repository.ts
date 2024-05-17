import { User } from '../entities';
import { Role } from '../entities/user.entity';

export interface IUserRepository {
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  getUserRole(id: string): Promise<Role>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
