import { jwt } from "@/factory/factory";
import { Logger } from "@/libs/logger/logger";
import { WinstonLogger } from "@/libs/logger/winston-logger";
import { NextFunction, Request, Response } from "express";

const winstonLogger: Logger = new WinstonLogger(
  "bearer-token-middleware-logger"
);

export const BearerTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    winstonLogger.logError("No authorization header");
    res.header("Content-Type", "application/json");
    res.status(401);
    res.json({ error: "No authorization header" });
    return;
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    winstonLogger.logError("Invalid token");
    res.header("Content-Type", "application/json");
    res.status(401);
    res.json({ error: "Invalid token" });
    return;
  }

  const valid = await jwt.verify(token);

  if (!valid) {
    winstonLogger.logError("Invalid token");
    res.header("Content-Type", "application/json");
    res.status(401);
    res.json({ error: "Invalid token" });
    return;
  }

  const decode = jwt.decode(token);

  if (!decode) {
    winstonLogger.logError("Invalid token");
    res.header("Content-Type", "application/json");
    res.status(401);
    res.json({ error: "Invalid token" });
    return;
  }

  req.headers = { ...req.headers, user_id: decode.user_id, role: decode.role };

  next();
};
