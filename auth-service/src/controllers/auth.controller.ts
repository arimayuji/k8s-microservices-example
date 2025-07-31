import { AuthUser } from "../models/user.model";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) { }

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