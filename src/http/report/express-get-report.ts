import { createAccount, generateReport } from "@/factory/factory";
import { Logger } from "@/libs/logger/logger";
import { WinstonLogger } from "@/libs/logger/winston-logger";
import { CreateAccountInput, GetReportInput } from "@/libs/zod/zod";
import { Input } from "@/services/create-account/CreateAccount";
import { Request, Response } from "express";

const winstonLogger: Logger = new WinstonLogger("get-report-logger");

export const GetReport = async (req: Request, res: Response) => {
  const userId = req.headers["user_id"];
  const { body } = req;
  const parsedBody = GetReportInput.parse(body);

  winstonLogger.logInfo(`Creating account for ${body.email}`);
  const reports = await generateReport.execute({
    ...parsedBody,
    userId: userId as string,
  });
  winstonLogger.logInfo(`Account created for ${body.email}`);
  res.header("Content-Type", "application/json");
  res.status(200);
  res.json(reports);
};
