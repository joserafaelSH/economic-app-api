import { faker } from "@faker-js/faker";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { UserRepository } from "@/repositories/UserRepository";
import { UserInMemoryRepository } from "@/database/in-memory/UserInMemoryRepository";
import { User } from "@/entities/User";
import { DeactiveAccount } from "./DeactiveAccount";

describe("DeactiveAccount tests", () => {
  let deactiveAccount: DeactiveAccount;
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = new UserInMemoryRepository();
    deactiveAccount = new DeactiveAccount(userRepository);
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

  it("should deactive account", async () => {
    await deactiveAccount.execute({ id: "1" });
    const updatedUser = await userRepository.findById("1");
    expect(updatedUser?.status).toBe("inactive");
  });
});
