import express from "express";
import { LoggerMiddleware } from "./logger-middleware";
import { Logger } from "@/libs/logger/logger";

export class ExpressServer {
  port: number;
  app: express.Application;
  baseUrl: string;
  logger: Logger;

  constructor(router: express.Router, logger: Logger) {
    this.logger = logger;
    this.port = Number(process.env.PORT) || 3000;
    this.app = express();
    this.baseUrl = `/api`;
    this.app.use(express.json());
    this.app.use(LoggerMiddleware);
    this.app.use(router);
  }

  start() {
    this.app.listen(this.port, () => {
      this.logger.logInfo(`Server running at http://localhost:${this.port}`);
    });
  }
}
