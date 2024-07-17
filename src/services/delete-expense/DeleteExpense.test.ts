import { faker } from "@faker-js/faker";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import { Expense } from "@/entities/Expense";
import { User } from "@/entities/User";
import { UserInMemoryRepository } from "@/database/in-memory/UserInMemoryRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { DeleteExpense } from "./DeleteExpense";
import { ExpenseInMemoryRepository } from "@/database/in-memory/ExpenseInMemoryRepository";

describe("DeleteExpense tests", () => {
  let deleteExpense: DeleteExpense;
  let expenseRepository: ExpenseRepository;
  let userRepository: UserRepository;

  beforeAll(() => {
    expenseRepository = new ExpenseInMemoryRepository();
    userRepository = new UserInMemoryRepository();
    deleteExpense = new DeleteExpense(expenseRepository);
  });

  beforeEach(async () => {
    const user = new User(
      "1",
      faker.internet.userName(),
      faker.internet.email(),
      faker.number.int({ min: 1 }),
      faker.internet.password(),
      "user",
      "active",
      null,
      null,
      new Date(),
      new Date()
    );
    await userRepository.save(user);

    const expense = new Expense(
      "1",
      faker.lorem.word(),
      faker.lorem.sentence(),
      faker.number.int({ min: 1 }),
      faker.date.recent(),
      faker.lorem.word(),
      "1",
      new Date(),
      new Date()
    );
    await expenseRepository.save(expense);
  });

  it("should delete expense", async () => {
    await deleteExpense.execute({ userId: "1", id: "1" });
    const expenses = await expenseRepository.findAll("1", {
      limit: 10,
      page: 1,
    });
    expect(expenses?.data).toHaveLength(0);
  });
});
