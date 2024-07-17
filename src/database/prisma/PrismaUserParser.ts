import { User as DomainUser, UserProps } from "@/entities/User";
import { User as PrismaUser } from "@prisma/client";

export class PrismaUserParser {
  static toEntity(user: PrismaUser): DomainUser {
    return new DomainUser(
      user.id,
      user.name,
      user.email,
      user.monthlyBudget,
      user.password,
      user.role,
      user.status,
      user.avatar,
      user.externalId,
      user.createdAt,
      user.updatedAt
    );
  }

  static toEntityProps(user: PrismaUser): UserProps {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      monthly_budget: user.monthlyBudget,
      password: user.password,
      role: user.role,
      status: user.status,
      avatar: user.avatar,
      external_id: user.externalId,
      updated_at: user.updatedAt,
      created_at: user.createdAt,
    };
  }

  static toDatabase(user: DomainUser): PrismaUser {
    const json = user.toJSON();
    return {
      id: json.id,
      name: json.name,
      email: json.email,
      monthlyBudget: json.monthly_budget,
      password: json.password,
      role: json.role,
      status: json.status,
      avatar: json.avatar || "",
      externalId: json.external_id,
      createdAt: json.created_at,
      updatedAt: json.updated_at,
    };
  }
}
