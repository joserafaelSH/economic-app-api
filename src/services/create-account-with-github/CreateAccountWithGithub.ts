import { User } from "@/entities/User";
import { Hash } from "@/libs/bcrypt/hash";
import { UserRepository } from "@/repositories/UserRepository";
import { randomUUID } from "crypto";

export type Input = {
  name: string;
  monthly_budget: number;
  external_id: string;
  avatar: string;
};

export type Output = void;

export class CreateAccountGithub {
  constructor(readonly userRepository: UserRepository, readonly hash: Hash) {}

  async execute(input: Input): Promise<Output> {
    const findUserByExternalId = await this.userRepository.findByExternalId(
      input.external_id
    );
    if (findUserByExternalId) {
      throw new Error("Email already in use");
    }

    const randomPassword = randomUUID();
    const password = await this.hash.make(randomPassword);

    const user = new User(
      randomUUID(),
      input.name,
      null,
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
