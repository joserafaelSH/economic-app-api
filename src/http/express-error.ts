import {
  EmailAlreadyInUseError,
  InvalidCredentialsError,
  UserNotFoundError,
} from "@/errors/errors";

import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    const zodError = err.flatten().fieldErrors;
    res.status(400);
    res.json({
      error: zodError,
    });
  }

  if (err instanceof EmailAlreadyInUseError) {
    res.status(409);
    res.json({
      error: err.message,
    });
  }

  if (err instanceof InvalidCredentialsError) {
    res.status(401);
    res.json({
      error: err.message,
    });
  }

  if (err instanceof UserNotFoundError) {
    res.status(404);
    res.json({
      error: err.message,
    });
  }

  if (err instanceof jwt.TokenExpiredError) {
    res.status(401);
    res.json({
      error: "Token expired",
    });
  }
};

export default errorHandler;
