import bcrypt from "bcryptjs";
import { AuthUser } from "../models/user.model";
import { IAuthRepository } from "./auth.repository";

export class InMemoryRepository implements IAuthRepository {
  private users: AuthUser[] = [
    {
      id: "1",
      email: "f2S7o@example.com",
      passwordHash: "password123"
    },
    {
      id: "2",
      email: "OYtHf@example.com",
      passwordHash: "password456"
    }
  ]

  login(email: string, password: string): Promise<string | null> {
    const hashedPassword = this.users.find(u => u.email === email)?.passwordHash;

    const comparePasswords = bcrypt.compareSync(password, hashedPassword || "");

    if(!comparePasswords) {
      return Promise.resolve(null);
    }

    const user = this.users.find(u => u.email === email);

    if(!user) {
      return Promise.resolve(null);
    }

    return Promise.resolve(`FAKE_TOKEN_FOR_${user.id}`);
  }

  register(email: string, password: string): Promise<string> {
    const isUserExists = this.users.find(u => u.email === email);

    if (isUserExists) {
      return Promise.resolve("User already exists");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser: AuthUser = {
      id: (this.users.length + 1).toString(),
      email,
      passwordHash: hashedPassword
    };

    this.users.push(newUser);

    return Promise.resolve("User registered successfully");
  }

  resetPassword(email: string, newPassword: string): Promise<string> {
    const user = this.users.find(u => u.email === email);

    if (!user) {
      return Promise.resolve("User not found");
    }

    const newUser: AuthUser = {
      ...user,
      passwordHash: bcrypt.hashSync(newPassword, 10)
    }

    return Promise.resolve("Password reset successfully");
  }

  findUserByEmail(email: string): Promise<AuthUser | null> {
    const user = this.users.find(u => u.email === email);

    if (!user) {
      return Promise.resolve(null);
    }

    return Promise.resolve(user);
  }

}