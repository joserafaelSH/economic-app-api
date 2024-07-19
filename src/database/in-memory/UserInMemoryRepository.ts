import { User } from "@/entities/User";
import { UserRepository } from "@/repositories/UserRepository";

export class UserInMemoryRepository implements UserRepository {
  findByExternalId(external_id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  private users: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index] = user;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
