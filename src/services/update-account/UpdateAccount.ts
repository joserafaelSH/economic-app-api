import { UserRepository } from "@/repositories/UserRepository";

export type Input = {
  id: string;
  name: string | null;
  monthly_budget: number | null;
  status: string | null;
  avatar: string | null;
};

export type Output = void;

export class UpdateAccount {
  constructor(readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.findById(input.id);
    if (!user) {
      throw new Error("User not found");
    }

    user.name = input.name || user.name;
    user.monthly_budget = input.monthly_budget || user.monthly_budget;
    user.status = input.status || user.status;
    user.avatar = input.avatar || user.avatar;

    await this.userRepository.update(user);
  }
}
