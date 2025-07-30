import { User } from "../models/user.model";
import { IUserRepository } from "../repositories/user.repository.interface";

export class UserService {
  constructor(private readonly repository: IUserRepository) {}

  async createUser(user: User): Promise<User> {
    const isUserAlreadyExists = await this.repository.findById(user.id);

    if (isUserAlreadyExists) {
      throw new Error("User already exists");
    }

    const createdUser = await this.repository.createUser(user);

    if (!createdUser) {
      throw new Error("Failed to create user");
    }

    return createdUser;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async remove(id: string): Promise<void> {
    await this.repository.deleteUser(id);
  }

  async update(newUser: Partial<User>, id: string): Promise<User> {
    const updatedUser = await this.repository.updateUser(id, newUser);

    if (!updatedUser) {
      throw new Error("Failed to update user");
    }

    return updatedUser;
  }
}
