import winston from "winston";
import { Logger } from "./logger";

export class WinstonLogger implements Logger {
  private error: winston.Logger;
  private warn: winston.Logger;
  private info: winston.Logger;
  private context: string;

  constructor(context: string) {
    const defaultConfig = (level: string) => ({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      context,
      transports: [
        new winston.transports.File({ filename: `${level}.log` }),
        new winston.transports.Console(),
      ],
    });

    this.context = context;

    this.error = winston.createLogger({
      level: "error",
      ...defaultConfig("error"),
    });

    this.warn = winston.createLogger({
      level: "warn",
      ...defaultConfig("warn"),
    });

    this.info = winston.createLogger({
      level: "info",
      ...defaultConfig("info"),
    });
  }

  logError(message: string) {
    this.error.error(message);
  }

  logWarn(message: string) {
    this.warn.warn(message);
  }

  logInfo(message: string) {
    this.info.info(message);
  }
}
