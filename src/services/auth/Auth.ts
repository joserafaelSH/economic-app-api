import { InvalidCredentialsError } from "@/errors/errors";
import { Hash } from "@/libs/bcrypt/hash";
import { AuthToken } from "@/libs/jwt/auth-token";
import { UserRepository } from "@/repositories/UserRepository";

export class Auth {
  constructor(
    readonly userRepository: UserRepository,
    readonly jwt: AuthToken,
    readonly hash: Hash
  ) {}

  generate(userId: string, role: string): string {
    return this.jwt.generate(userId, role);
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
      throw new InvalidCredentialsError("Invalid credentials");
    }

    const isPasswordValid = await this.hash.compare(password, user.password!);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError("Invalid credentials");
    }

    return this.generate(user.id, "USER");
  }

  async githubLogin(externalId: string): Promise<string | null> {
    const user = await this.userRepository.findByExternalId(externalId);
    if (!user) {
      return null;
    }

    return this.generate(user.id, "USER");
  }
}
