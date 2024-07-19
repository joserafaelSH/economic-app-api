import { createExpense, updateExpense } from "@/factory/factory";
import { Logger } from "@/libs/logger/logger";
import { WinstonLogger } from "@/libs/logger/winston-logger";
import { UpdateAccountInput } from "@/libs/zod/zod";
import { Input } from "@/services/create-expense/CreateExpense";
import { Request, Response } from "express";

const winstonLogger: Logger = new WinstonLogger("create-expense-logger");

export const UpdateUser = async (req: Request, res: Response) => {
  const { body } = req;
  const id = req.params["id"];
  const userId = req.headers["user_id"];
  const parsedBody = UpdateAccountInput.parse(body);

  winstonLogger.logInfo(`Creating expense ${JSON.stringify(parsedBody)}`);

  await updateExpense.execute({ ...parsedBody, userId: userId as string, id });
  winstonLogger.logInfo(`expense created`);
  res.header("Content-Type", "application/json");
  res.status(201);
  res.send("expense created");
};
