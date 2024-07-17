import { randomUUID } from "crypto";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { Expense } from "@/entities/Expense";

export type Input = {
  name: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
  user_id: string;
};

export type Output = void;

export class CreateExpense {
  constructor(
    readonly expenseRepository: ExpenseRepository,
    readonly userRepository: UserRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.findById(input.user_id);
    if (!user) {
      throw new Error("User not found");
    }

    const expense = new Expense(
      randomUUID(),
      input.name,
      input.description,
      input.amount,
      input.date,
      input.category,
      input.user_id,
      new Date(),
      new Date()
    );

    await this.expenseRepository.save(expense);
  }
}
