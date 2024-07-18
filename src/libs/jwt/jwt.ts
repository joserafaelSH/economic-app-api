import jwt from "jsonwebtoken";
import { AuthToken } from "./auth-token";

export type JwtPayload = { user_id: string };

export class Jwt implements AuthToken {
  generate(userId: string): string {
    const options: jwt.SignOptions = {
      expiresIn: "1h",
    };
    const payload: JwtPayload = { user_id: userId };
    return jwt.sign(payload, process.env.JWT_SECRET!, options);
  }

  async verify(token: string): Promise<boolean> {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) {
      return false;
    }

    return true;
  }
}
