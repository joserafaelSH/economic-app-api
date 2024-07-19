import { auth, createAccount } from "@/factory/factory";
import { Logger } from "@/libs/logger/logger";
import { WinstonLogger } from "@/libs/logger/winston-logger";
import { LoginInput } from "@/libs/zod/zod";
import { maskData } from "@/utils/mask-data";

import { NextFunction, Request, Response } from "express";

const winstonLogger: Logger = new WinstonLogger("login-logger");

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const parsedBody = LoginInput.parse(body);
    winstonLogger.logInfo(`Login for ${maskData(body.email)}`);
    const token = await auth.defaultLogin(
      parsedBody.email,
      parsedBody.password
    );

    winstonLogger.logInfo(`Login success for ${maskData(body.email)}`);
    res.header("Content-Type", "application/json");
    res.status(200);
    res.json({ token });
  } catch (error: any) {
    winstonLogger.logError(`Login failed for ${maskData(req.body.email)}`);
    next(error);
  }
};
