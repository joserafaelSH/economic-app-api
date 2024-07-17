import { faker } from "@faker-js/faker";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { UserInMemoryRepository } from "@/database/in-memory/UserInMemoryRepository";
import { Expense } from "@/entities/Expense";
import { User } from "@/entities/User";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { GetExpenses } from "./GetExpenses";
import { ExpenseInMemoryRepository } from "@/database/in-memory/ExpenseInMemoryRepository";

describe("GetExpenses tests", () => {
  let getExpenses: GetExpenses;
  let expenseRepository: ExpenseRepository;
  let userRepository: UserRepository;

  beforeAll(() => {
    expenseRepository = new ExpenseInMemoryRepository();
    userRepository = new UserInMemoryRepository();
    getExpenses = new GetExpenses(expenseRepository, userRepository);
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

  afterEach(async () => {
    await expenseRepository.delete("1", "1");
    await userRepository.delete("1");
  });

  it("should get expenses", async () => {
    const result = await getExpenses.execute({ userId: "1", pagination: {} });
    expect(result?.data).toHaveLength(1);
    expect(result?.total).toBe(1);
  });
});
