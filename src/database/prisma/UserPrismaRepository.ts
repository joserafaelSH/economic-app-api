import { User } from "@/entities/User";
import { UserRepository } from "@/repositories/UserRepository";
import { PrismaClient } from "@prisma/client";
import { PrismaUserParser } from "./PrismaUserParser";

export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return PrismaUserParser.toEntity(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return PrismaUserParser.toEntity(user);
  }
  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: PrismaUserParser.toDatabase(user),
    });
  }
  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: PrismaUserParser.toDatabase(user),
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
