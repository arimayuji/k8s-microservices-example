import { User } from "../models/user.model";
import { IUserRepository } from "../repositories/user.repository.interface";

export class UserController {
  constructor(private readonly repository: IUserRepository) { }
  
  async createUser(user: User): Promise<User> {
    const createdUser = await this.repository.createUser(user);
    
    return createdUser;
  }

  async findUser(id: string): Promise<User | null> {
    const user = await this.repository.findById(id);
    
    return user;
  }

  async updateUser(id: string, user: Partial<User>): Promise<User | null> {
    const updatedUser = await this.repository.updateUser(id, user);

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.repository.deleteUser(id);

    return Promise.resolve();
  }
}