import { createAccount } from "@/factory/factory";
import { Logger } from "@/libs/logger/logger";
import { WinstonLogger } from "@/libs/logger/winston-logger";
import { CreateAccountInput } from "@/libs/zod/zod";
import { Input } from "@/services/create-account/CreateAccount";
import { maskData } from "@/utils/mask-data";
import { NextFunction, Request, Response } from "express";

const winstonLogger: Logger = new WinstonLogger("create-account-logger");

export const CreateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const parsedBody = CreateAccountInput.parse(body);

    winstonLogger.logInfo(`Creating account for ${maskData(body.email)}`);
    await createAccount.execute(parsedBody);
    winstonLogger.logInfo(`Account created for ${maskData(body.email)}`);
    res.header("Content-Type", "application/json");
    res.status(201);
    res.send("Account created");
  } catch (error: any) {
    winstonLogger.logError(error.message);
    next(error);
  }
};
