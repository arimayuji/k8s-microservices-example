import { AuthUser } from "../models/user.model";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  async login(email: string, password: string): Promise<string> {
    try {
      const token = await this.authService.login(email, password);

      return token;
    }catch (error) {
      throw new Error("Login failed");
    }
  }
  
  async registerUser(email: string, password: string): Promise<string> {
    try {
      const result = await this.authService.register(email, password);

      if (result === "User already exists") {
        throw new Error("User already exists");
      }

      return result;
    }
    catch (error) {
      throw new Error("Registration failed");
    }
  }

  async resetPassword(email: string, newPassword: string): Promise<string> {
    try {
      const result = await this.authService.resetPassword(email, newPassword);

      return result;
    } catch (error) {
      throw new Error("Password reset failed");
    }
  }

  async findUserByEmail(email: string): Promise<AuthUser | null> {
    try {
      const user = await this.authService.findUserByEmail(email);

      return user;
    } catch (error) {
      throw new Error("User not found");
    }
  }
  
}