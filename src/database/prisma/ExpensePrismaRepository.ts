import { Expense, ExpenseProps } from "@/entities/Expense";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import {
  PaginationProps,
  PaginatedResponse,
} from "@/repositories/PaginatedResponse";
import { PrismaClient } from "@prisma/client";
import { PrismaExpenseParser } from "./PrismaExpenseParser";

export class ExpensePrismaRepository implements ExpenseRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(userId: string, id: string): Promise<Expense | null> {
    const expense = await this.prisma.expense.findUnique({
      where: { id, userId },
    });
    if (!expense) return null;
    return PrismaExpenseParser.toEntity(expense);
  }

  async findAll(
    userId: string,
    pagination: PaginationProps
  ): Promise<PaginatedResponse<ExpenseProps>> {
    const total = await this.prisma.expense.count({ where: { userId } });

    const expenses = await this.prisma.expense.findMany({
      where: { userId },
      skip: pagination.page * pagination.limit,
      take: pagination.limit,
    });

    const data = expenses.map(PrismaExpenseParser.toEntityProps);
    return { data, total, page: pagination.page, limit: pagination.limit };
  }

  async save(expense: Expense): Promise<void> {
    await this.prisma.expense.create({
      data: PrismaExpenseParser.toDatabase(expense),
    });
  }

  async update(expense: Expense): Promise<void> {
    await this.prisma.expense.update({
      where: { id: expense.id },
      data: PrismaExpenseParser.toDatabase(expense),
    });
  }
  async delete(userId: string, id: string): Promise<void> {
    await this.prisma.expense.delete({ where: { id, userId } });
  }

  async findByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Expense[]> {
    const expenses = await this.prisma.expense.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return expenses.map(PrismaExpenseParser.toEntity);
  }
}
