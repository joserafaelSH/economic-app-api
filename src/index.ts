import { router } from "./http/express-router";
import { ExpressServer } from "./http/express-server";
import { Logger } from "./libs/logger/logger";
import { WinstonLogger } from "./libs/logger/winston-logger";

const logger: Logger = new WinstonLogger("express-server");
const server = new ExpressServer(router, logger);

server.start();
