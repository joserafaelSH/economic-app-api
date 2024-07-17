import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import { UserRepository } from "@/repositories/UserRepository";

export type Input = {
  userId: string;
  startDate: Date;
  endDate: Date;
};

export type Output = {
  totalExpenses: number;
  totalBudget: number;
  totalRemaining: number;
  data: {
    expenseName: string;
    expenseAmount: number;
    expenseDate: Date;
    expenseCategory: string;
  }[];
};

export class GenerateReport {
  constructor(
    readonly userRepository: UserRepository,
    readonly expenseRepository: ExpenseRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.findById(input.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const expenses = await this.expenseRepository.findByDateRange(
      input.userId,
      input.startDate,
      input.endDate
    );

    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    const totalBudget = user.monthly_budget;
    const totalRemaining = totalBudget - totalExpenses;

    const data = expenses.map((expense) => ({
      expenseName: expense.name,
      expenseAmount: expense.amount,
      expenseDate: expense.date,
      expenseCategory: expense.category,
    }));

    return {
      totalExpenses,
      totalBudget,
      totalRemaining,
      data,
    };
  }
}
