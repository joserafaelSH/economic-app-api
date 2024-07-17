import { faker } from "@faker-js/faker";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { CreateExpense, Input } from "./CreateExpense";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { ExpenseInMemoryRepository } from "@/database/in-memory/ExpenseInMemoryRepository";
import { UserInMemoryRepository } from "@/database/in-memory/UserInMemoryRepository";
import { User } from "@/entities/User";

describe("CreateExpense tests", () => {
  let createExpense: CreateExpense;
  let expenseRepository: ExpenseRepository;
  let userRepository: UserRepository;

  beforeAll(() => {
    expenseRepository = new ExpenseInMemoryRepository();
    userRepository = new UserInMemoryRepository();
    createExpense = new CreateExpense(expenseRepository, userRepository);
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
  });

  afterEach(async () => {
    await userRepository.delete("1");
  });

  it("should create a new expense", async () => {
    const input: Input = {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      amount: faker.number.int({ min: 1 }),
      date: faker.date.recent(),
      category: faker.lorem.word(),
      user_id: "1",
    };

    await createExpense.execute(input);
    const expense = await expenseRepository.findAll("1", {});
    expect(expense).not.toBeNull();
  });
});
