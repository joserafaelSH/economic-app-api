import { Expense, ExpenseProps } from "@/entities/Expense";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import {
  PaginatedResponse,
  PaginationProps,
} from "@/repositories/PaginatedResponse";

export class ExpenseInMemoryRepository implements ExpenseRepository {
  private expenses: Expense[] = [];

  async findAll(
    userId: string,
    pagination: PaginationProps
  ): Promise<PaginatedResponse<ExpenseProps>> {
    const response = this.expenses
      .filter((expense) => expense.user_id === userId)
      .slice(pagination.page * pagination.limit, pagination.limit);

    const responseProps = response.map((expense) => expense.toJSON());

    return Promise.resolve({
      data: responseProps,
      total: this.expenses.length,
      page: pagination.page,
      limit: pagination.limit,
    });
  }
  async delete(id: string): Promise<void> {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);
  }

  async save(expense: Expense): Promise<void> {
    this.expenses.push(expense);
  }

  async update(expense: Expense): Promise<void> {
    const index = this.expenses.findIndex((e) => e.id === expense.id);
    this.expenses[index] = expense;
  }

  async findById(userId: string, id: string): Promise<Expense | null> {
    return (
      this.expenses.find(
        (expense) => expense.id === id && expense.user_id === userId
      ) || null
    );
  }

  async findByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Expense[]> {
    return this.expenses.filter(
      (expense) =>
        expense.user_id === userId &&
        expense.date >= startDate &&
        expense.date <= endDate
    );
  }
}
