import { UserRepository } from "@/repositories/UserRepository";

export type Input = {
  id: string;
};

export type Output = void;

export class DeactiveAccount {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.findById("1");
    if (!user) {
      throw new Error("Account not found");
    }

    user.status = "inactive";

    await this.userRepository.update(user);
  }
}
