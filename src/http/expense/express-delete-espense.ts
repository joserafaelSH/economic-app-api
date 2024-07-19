import { deleteExpense } from "@/factory/factory";
import { Logger } from "@/libs/logger/logger";
import { WinstonLogger } from "@/libs/logger/winston-logger";
import { Request, Response } from "express";

const winstonLogger: Logger = new WinstonLogger("delete-expense-logger");

export const DeleteExpense = async (req: Request, res: Response) => {
  const expenseId = req.params.id;
  const userId = req.headers["user_id"];

  winstonLogger.logInfo(`Delete expense ${expenseId}`);

  await deleteExpense.execute({ id: expenseId, userId: userId as string });
  winstonLogger.logInfo(`expense deleted`);
  res.header("Content-Type", "application/json");
  res.status(201);
  res.send("expense deleted");
};
