import { Hash } from "./hash";
import * as bcrypt from "bcrypt";

export class BcryptHash implements Hash {
  constructor() {}

  async make(textPassword: string): Promise<string> {
    return await bcrypt.hash(textPassword, Number(process.env.SALTS!));
  }

  async compare(
    textPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(textPassword, hashedPassword);
  }
}
