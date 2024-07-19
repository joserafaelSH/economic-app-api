import { createExpense } from "@/factory/factory";
import { Logger } from "@/libs/logger/logger";
import { WinstonLogger } from "@/libs/logger/winston-logger";
import { CreateExpenseInput } from "@/libs/zod/zod";
import { NextFunction, Request, Response } from "express";

const winstonLogger: Logger = new WinstonLogger("create-expense-logger");

export const CreateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const userId = req.headers["user_id"];
    const parsedBody = CreateExpenseInput.parse(body);
    winstonLogger.logInfo(`Creating expense ${JSON.stringify(parsedBody)}`);
    await createExpense.execute({ ...parsedBody, user_id: userId as string });
    winstonLogger.logInfo(`expense created`);
    res.header("Content-Type", "application/json");
    res.status(201);
    res.send("expense created");
    return;
  } catch (error: any) {
    winstonLogger.logError(`Failed to create expense ${error.message}`);
    next(error);
  }
};
