import { deleteExpense, getExpenses } from "@/factory/factory";
import { Logger } from "@/libs/logger/logger";
import { WinstonLogger } from "@/libs/logger/winston-logger";
import { Request, Response } from "express";

const winstonLogger: Logger = new WinstonLogger("get-expense-logger");

export const GetExpenses = async (req: Request, res: Response) => {
  const userId = req.headers["user_id"];

  winstonLogger.logInfo(`Delete expense ${userId}`);

  const expenses = await getExpenses.execute({
    userId: userId as string,
    pagination: {
      limit: 10,
      page: 0,
    },
  });

  winstonLogger.logInfo(`expense deleted`);
  res.header("Content-Type", "application/json");
  res.status(201);
  res.json(expenses);
};
