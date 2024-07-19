import { beforeAll, describe, expect, it } from "vitest";

import { faker } from "@faker-js/faker";
import { CreateAccount, Input } from "./CreateAccount";
import { UserRepository } from "@/repositories/UserRepository";
import { UserInMemoryRepository } from "@/database/in-memory/UserInMemoryRepository";
import { Hash } from "@/libs/bcrypt/hash";
import { BcryptHash } from "@/libs/bcrypt/bcrypt";

describe("CreateAccount tests", () => {
  let createAccount: CreateAccount;
  let userRepository: UserRepository;
  let hash: Hash;

  beforeAll(() => {
    userRepository = new UserInMemoryRepository();
    hash = new BcryptHash();
    createAccount = new CreateAccount(userRepository, hash);
  });

  it("should create a new account", async () => {
    const input: Input = {
      email: faker.internet.email(),
      external_id: null,
      monthly_budget: faker.number.int({ min: 1 }),
      name: faker.internet.userName(),
      password: faker.internet.password(),
    };

    await createAccount.execute(input);
    const user = await userRepository.findByEmail(input.email);
    expect(user).not.toBeNull();
    expect(user?.email).toBe(input.email);
    expect(user?.name).toBe(input.name);
    expect(user?.monthly_budget).toBe(input.monthly_budget);
  });
});
