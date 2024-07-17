import { Expense, ExpenseProps } from "@/entities/Expense";
import { PaginatedResponse, PaginationProps } from "./PaginatedResponse";

export interface ExpenseRepository {
  findById(userId: string, id: string): Promise<Expense | null>;
  findAll(
    userId: string,
    pagination: PaginationProps
  ): Promise<PaginatedResponse<ExpenseProps>>;
  save(expense: Expense): Promise<void>;
  update(expense: Expense): Promise<void>;
  delete(userId: string, id: string): Promise<void>;
  findByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Expense[]>;
}
