import { AuthUser } from "../models/user.model";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  async login(email: string, password: string): Promise<string> {
    return this.authService.login(email, password);
  }
  
  async registerUser(email: string, password: string): Promise<string> {
    return this.authService.register(email, password);
  }

  async resetPassword(email: string, newPassword: string): Promise<string> {
    return this.authService.resetPassword(email, newPassword);
  }

  async findUserByEmail(email: string): Promise<AuthUser | null> {
    return this.authService.findUserByEmail(email);
  }
}