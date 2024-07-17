import { ExpenseRepository } from "@/repositories/ExpenseRepository";

export type Input = {
  userId: string;
  id: string;
};

export type Output = void;

export class DeleteExpense {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async execute(input: Input): Promise<Output> {
    const expense = await this.expenseRepository.findById(
      input.userId,
      input.id
    );
    if (!expense) {
      throw new Error("Expense not found");
    }

    await this.expenseRepository.delete(input.userId, input.id);
  }
}
