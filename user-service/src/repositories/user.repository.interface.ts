import { User } from '../models/user.model';

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  updateUser(id: string, user: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<void>;
}