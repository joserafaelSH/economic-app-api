import { router } from "./http/express-router";
import { ExpressServer } from "./http/express-server";
import { sdk } from "./instrumentations";
import { Logger } from "./libs/logger/logger";
import { WinstonLogger } from "./libs/logger/winston-logger";

const logger: Logger = new WinstonLogger("express-server");
export const server = new ExpressServer(router, logger);

server.start();

//tratar erro não mapeado
process.on("uncaughtException", (err: any, origin: any) => {
  console.error(err);
  logger.logError(err.toString());
});

//Tratar promise com reject não tratado
process.on("unhandledRejection", (err: any) => {
  console.error(err);
  logger.logError(err.toString());
});
