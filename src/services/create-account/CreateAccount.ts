import { User } from "@/entities/User";
import { Hash } from "@/libs/bcrypt/hash";
import { UserRepository } from "@/repositories/UserRepository";
import { randomUUID } from "crypto";

export type Input = {
  name: string;
  email: string;
  monthly_budget: number;
  password: string;
  external_id: string | null;
};

export type Output = void;

export class CreateAccount {
  constructor(readonly userRepository: UserRepository, readonly hash: Hash) {}

  async execute(input: Input): Promise<Output> {
    const findUserByEmail = await this.userRepository.findByEmail(input.email);
    if (findUserByEmail) {
      throw new Error("Email already in use");
    }

    const password = await this.hash.make(input.password);

    const user = new User(
      randomUUID(),
      input.name,
      input.email,
      input.monthly_budget,
      password,
      "user",
      "active",
      null,
      input.external_id,
      new Date(),
      new Date()
    );

    await this.userRepository.save(user);
  }
}
