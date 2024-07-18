import { Logger } from "@/libs/logger/logger";
import { WinstonLogger } from "@/libs/logger/winston-logger";
import { Request, Response, NextFunction } from "express";

const winstonLogger: Logger = new WinstonLogger("logger-middleware");

export const LoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url } = req;
  winstonLogger.logInfo(`${method} - ${url}`);
  next();
};
