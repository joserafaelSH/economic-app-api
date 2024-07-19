import { ExpenseProps } from "@/entities/Expense";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import {
  PaginatedResponse,
  PaginationProps,
} from "@/repositories/PaginatedResponse";
import { UserRepository } from "@/repositories/UserRepository";

export type Input = {
  userId: string;
  pagination: PaginationProps;
};

export type Output = PaginatedResponse<ExpenseProps> | null;

export class GetExpenses {
  constructor(
    readonly expenseRepository: ExpenseRepository,
    readonly userRepository: UserRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.findById(input.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const expenses = await this.expenseRepository.findAll(
      input.userId,
      input.pagination
    );

    return expenses;
  }
}
