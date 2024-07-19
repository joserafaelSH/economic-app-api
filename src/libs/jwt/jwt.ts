import jwt from "jsonwebtoken";
import { AuthToken } from "./auth-token";

export type JwtPayload = { user_id: string; role: string };

export class Jwt implements AuthToken {
  generate(userId: string, role: string): string {
    const options: jwt.SignOptions = {
      expiresIn: "1h",
    };
    const payload: JwtPayload = { user_id: userId, role };
    return jwt.sign(payload, process.env.JWT_SECRET!, options);
  }

  async verify(token: string): Promise<boolean> {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) {
      return false;
    }

    return true;
  }

  decode(token: string): JwtPayload {
    const decoded: any = jwt.decode(token);
    return decoded as JwtPayload;
  }
}
