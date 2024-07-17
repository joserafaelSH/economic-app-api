import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { GenerateReport } from "./GenerateReport";
import { ExpenseInMemoryRepository } from "@/database/in-memory/ExpenseInMemoryRepository";
import { UserInMemoryRepository } from "@/database/in-memory/UserInMemoryRepository";
import { Expense } from "@/entities/Expense";
import { User } from "@/entities/User";
import { faker } from "@faker-js/faker";

describe("GenerateReports tests", () => {
  let generateReport: GenerateReport;
  let expenseRepository: ExpenseRepository;
  let userRepository: UserRepository;
  const startDate = "2022-01-01T00:00:00.000Z";
  const endDate = "2022-03-01T00:00:00.000Z";
  beforeAll(() => {
    expenseRepository = new ExpenseInMemoryRepository();
    userRepository = new UserInMemoryRepository();
    generateReport = new GenerateReport(userRepository, expenseRepository);
  });

  beforeEach(async () => {
    const user = new User(
      "1",
      faker.internet.userName(),
      faker.internet.email(),
      1000,
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
      100,
      new Date(startDate),
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

  it("should generate report", async () => {
    const result = await generateReport.execute({
      userId: "1",
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
    expect(result.totalExpenses).toBeGreaterThan(0);
    expect(result.totalBudget).toBeGreaterThan(0);
    expect(result.totalRemaining).toBeGreaterThan(0);
    expect(result.data).toHaveLength(1);
  });
});
