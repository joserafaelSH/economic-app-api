import { PrismaClient } from "@prisma/client";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import { ExpensePrismaRepository } from "@/database/prisma/ExpensePrismaRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { UserPrismaRepository } from "@/database/prisma/UserPrismaRepository";
import { Hash } from "@/libs/bcrypt/hash";
import { BcryptHash } from "@/libs/bcrypt/bcrypt";
import { CreateAccount } from "@/services/create-account/CreateAccount";
import { CreateExpense } from "@/services/create-expense/CreateExpense";
import { DeactiveAccount } from "@/services/deactive-account/DeactiveAccount";
import { DeleteExpense } from "@/services/delete-expense/DeleteExpense";
import { GenerateReport } from "@/services/generate-report/GenerateReport";
import { GetExpenses } from "@/services/get-expenses/GetExpenses";
import { UpdateAccount } from "@/services/update-account/UpdateAccount";
import { UpdateExpense } from "@/services/update-expense/UpdateExpense";

const prismaClient = new PrismaClient({ log: ["query"] });
const expenseRepository: ExpenseRepository = new ExpensePrismaRepository(
  prismaClient
);
const userRepository: UserRepository = new UserPrismaRepository(prismaClient);

const hash: Hash = new BcryptHash();

export const createAccount = new CreateAccount(userRepository, hash);

export const createExpense = new CreateExpense(
  expenseRepository,
  userRepository
);

export const deactiveAccount = new DeactiveAccount(userRepository);

export const deleteExpense = new DeleteExpense(expenseRepository);

export const generateReport = new GenerateReport(
  userRepository,
  expenseRepository
);

export const getExpenses = new GetExpenses(expenseRepository, userRepository);

export const updateAccount = new UpdateAccount(userRepository);

export const updateExpense = new UpdateExpense(expenseRepository);
