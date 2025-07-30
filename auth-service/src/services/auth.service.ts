import { AuthUser } from "../models/user.model";
import { IAuthRepository } from "../repositories/auth.repository";
import bcrypt, { compare } from "bcryptjs";

export class AuthService {
  constructor(private readonly IAuthRepository: IAuthRepository) { }

  async login(email: string, password: string): Promise<string>{
    const user = await this.IAuthRepository.findUserByEmail(email);

    if(!user) {
      return "User not found";
    }

    const isValidPassword = await compare(password, user.passwordHash);

    if (!isValidPassword) {
      return "Invalid credentials";
    }
    
    return `FAKE_TOKEN_FOR_${user.id}`;
  }

  async register(email: string, password: string): Promise<string>{
    const isUserExists = await this.IAuthRepository.findUserByEmail(email);

    if (isUserExists) {
      return "User already exists";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.IAuthRepository.register(email, hashedPassword);

    return "User registered successfully";
  }

  async resetPassword(email: string, newPassword: string): Promise<string> {
    const isUserExists = await this.IAuthRepository.findUserByEmail(email);

    if (!isUserExists) {
      return "User not found";
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await this.IAuthRepository.resetPassword(email, newHashedPassword);

    return "Password reset successfully";
  }

  async findUserByEmail(email: string): Promise<AuthUser | null> {
    const user = await this.IAuthRepository.findUserByEmail(email);
    
    if (!user) {
      return null;
    }

    return user;
  }
}