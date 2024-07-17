import { ExpenseRepository } from "@/repositories/ExpenseRepository";

export type Input = {
  userId: string;
  id: string;
  name: string | null;
  description: string | null;
  amount: number | null;
  category: string | null;
  date: Date | null;
};

export type Output = void;

export class UpdateExpense {
  constructor(readonly expenseRepository: ExpenseRepository) {}

  async execute(input: Input): Promise<Output> {
    const expense = await this.expenseRepository.findById(
      input.userId,
      input.id
    );
    if (!expense) {
      throw new Error("Expense not found");
    }

    expense.name = input.name || expense.name;
    expense.description = input.description || expense.description;
    expense.amount = input.amount || expense.amount;
    expense.category = input.category || expense.category;
    expense.date = input.date || expense.date;

    await this.expenseRepository.update(expense);
  }
}
