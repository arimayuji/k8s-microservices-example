import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private readonly service: UserService) { }


   async startupCheck(): Promise<string> {
    try {
      setTimeout(() => {
        console.log("Startup check completed");
      }, 3000);

      return "OK";
    } catch (error) {
      throw new Error("Startup check failed");
    }
  }

  async healthCheck(): Promise<string> {
    try {
      setTimeout(() => {
        console.log("Health check completed");
      }, 5000);

      return "OK";
    } catch (error) {
      throw new Error("Health check failed");
    }
  }

  async readyCheck(): Promise<string> {
    try {
      setTimeout(() => {
        console.log("Ready check completed");
      }, 7000);

      return "OK";
    }catch(error) {
      throw new Error("Ready check failed");
    }
  }
  
  async createUser(user: User): Promise<User> {
    try {
      const createdUser = await this.service.createUser(user);
      
      return createdUser;
    } catch (error) {
      throw new Error("Failed to create user");
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.service.findById(id);
      
      return user;
    }catch (error) {
      throw new Error("User not found");
    }
  }

  async updateUser(id: string, user: Partial<User>): Promise<User | null> {
    try {
      const updatedUser = await this.service.update(user, id);

      return updatedUser;
    } catch (error) {
      throw new Error("Failed to update user");
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.service.remove(id);
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  }
}