import { Expense as DomainExpense, ExpenseProps } from "@/entities/Expense";
import { Expense as PrismaExpense } from "@prisma/client";

export class PrismaExpenseParser {
  static toEntity(expense: PrismaExpense): DomainExpense {
    return new DomainExpense(
      expense.id,
      expense.name,
      expense.description,
      expense.amount,
      expense.date,
      expense.category,
      expense.userId,
      expense.createdAt,
      expense.updatedAt
    );
  }

  static toEntityProps(expense: PrismaExpense): ExpenseProps {
    return {
      id: expense.id,
      name: expense.name,
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
      category: expense.category,
      user_id: expense.userId,
      updated_at: expense.updatedAt,
      created_at: expense.createdAt,
    };
  }

  static toDatabase(expense: DomainExpense): PrismaExpense {
    const json = expense.toJSON();
    return {
      id: json.id,
      name: json.name,
      description: json.description,
      amount: json.amount,
      date: json.date,
      category: json.category,
      userId: json.user_id,
      createdAt: json.created_at,
      updatedAt: json.updated_at,
    };
  }
}
