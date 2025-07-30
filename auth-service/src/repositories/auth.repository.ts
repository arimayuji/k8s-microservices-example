import { AuthUser } from "../models/user.model";

export interface IAuthRepository {
  login(email: string, password: string): Promise<string | null>;
  register(email: string, password: string): Promise<string>;
  resetPassword(email: string, newPassword: string): Promise<string>;
  findUserByEmail(email: string): Promise<AuthUser | null>;
}