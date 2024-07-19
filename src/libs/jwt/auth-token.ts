import { JwtPayload } from "./jwt";

export interface AuthToken {
  generate(userId: string, role: string): string;
  verify(token: string): Promise<boolean>;
  decode(token: string): JwtPayload;
}
