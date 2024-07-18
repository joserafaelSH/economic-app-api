import { AuthToken } from "@/libs/jwt/auth-token";
import { UserRepository } from "@/repositories/UserRepository";

export class Auth {
  constructor(
    readonly userRepository: UserRepository,
    readonly jwt: AuthToken
  ) {}

  generate(userId: string): string {
    return this.jwt.generate(userId);
  }

  async verify(token: string): Promise<boolean> {
    const decoded: any = this.jwt.verify(token);
    if (!decoded) {
      return false;
    }
    const userId = decoded.user_id;
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return false;
    }

    return true;
  }

  async defaultLogin(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    if (user.password !== password) {
      return null;
    }

    return this.generate(user.id);
  }
}
