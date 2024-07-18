import { createAccount } from "@/factory/factory";
import { Logger } from "@/libs/logger/logger";
import { WinstonLogger } from "@/libs/logger/winston-logger";
import { Input } from "@/services/create-account/CreateAccount";
import { Request, Response } from "express";

const winstonLogger: Logger = new WinstonLogger("create-account-logger");

export const CreateAccount = async (req: Request, res: Response) => {
  const { body } = req;
  const parsedBody = body as Input;
  winstonLogger.logInfo(`Creating account for ${body.email}`);
  await createAccount.execute(parsedBody);
  winstonLogger.logInfo(`Account created for ${body.email}`);
  res.header("Content-Type", "application/json");
  res.status(201);
  res.send("Account created");
};
