import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Input } from "./UpdateAccount";
import { UserRepository } from "@/repositories/UserRepository";
import { UserInMemoryRepository } from "@/database/in-memory/UserInMemoryRepository";
import { faker } from "@faker-js/faker";
import { UpdateAccount } from "./UpdateAccount";
import { User } from "@/entities/User";

describe("UpdateAccount tests", () => {
  let updateAccount: UpdateAccount;
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = new UserInMemoryRepository();
    updateAccount = new UpdateAccount(userRepository);
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

  it("should update account", async () => {
    const input: Input = {
      id: "1",
      name: faker.internet.userName(),
      monthly_budget: faker.number.int({ min: 1 }),
      status: "inactive",
      avatar: "avatar.jpg",
    };
    await updateAccount.execute(input);
    const user = await userRepository.findById("1");

    expect(user).toBeDefined();
    expect(user?.name).toBe(input.name);
    expect(user?.monthly_budget).toBe(input.monthly_budget);
    expect(user?.status).toBe(input.status);
    expect(user?.avatar).toBe(input.avatar);
  });
});
