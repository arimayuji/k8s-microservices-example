
import { User } from "../models/user.model";
import { IUserRepository } from "./user.repository.interface";

export class InMemoryRepository implements IUserRepository{
  private users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "f2S7o@example.com",
      password: "password123"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "OYtHf@example.com",
      password: "password456"
    }
  ];

  createUser(user: User): Promise<User> {
    this.users.push(user);
    return Promise.resolve(user); 
  }

  findById(id: string): Promise<User | null> {
    const foundedUser = this.users.find(u => u.id === id);
    return Promise.resolve(foundedUser || null);
  } 

  updateUser(id: string, user: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return Promise.resolve(null);
    }

    const updatedUser = { ...this.users[userIndex], ...user };

    this.users[userIndex] = updatedUser;

    return Promise.resolve(updatedUser);
  }

  deleteUser(id: string): Promise<void> {
    const userIndex = this.users.findIndex(u => u.id === id);
    
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
    }

    return Promise.resolve();
  }
  
}