import { faker } from "@faker-js/faker";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Expense } from "@/entities/Expense";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import { Input, UpdateExpense } from "./UpdateExpense";
import { User } from "@/entities/User";
import { UserInMemoryRepository } from "@/database/in-memory/UserInMemoryRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { ExpenseInMemoryRepository } from "@/database/in-memory/ExpenseInMemoryRepository";

describe("UpdateAccount tests", () => {
  let updateExpense: UpdateExpense;
  let expenseRepository: ExpenseRepository;
  let userRepository: UserRepository;

  beforeAll(() => {
    expenseRepository = new ExpenseInMemoryRepository();
    userRepository = new UserInMemoryRepository();
    updateExpense = new UpdateExpense(expenseRepository);
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

  it("should update expense", async () => {
    const input: Input = {
      userId: "1",
      id: "1",
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      amount: faker.number.int({ min: 1 }),
      category: faker.lorem.word(),
      date: faker.date.recent(),
    };
    await updateExpense.execute(input);
    const expense = await expenseRepository.findById("1", "1");
    expect(expense).toBeDefined();
    expect(expense?.name).toBe(input.name);
    expect(expense?.description).toBe(input.description);
    expect(expense?.amount).toBe(input.amount);
    expect(expense?.category).toBe(input.category);
    expect(expense?.date).toBe(input.date);
  });
});
