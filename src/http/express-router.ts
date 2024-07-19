import express from "express";
import { BearerTokenMiddleware } from "./auth/bearer-token-middleware";
import { CreateAccount } from "./auth/express-create-account";
import { GithubAuth, GithubAuthResponse } from "./auth/express-github-auth";
import { Login } from "./auth/express-login";
import { CreateExpense } from "./expense/express-create-expense";
import { UpdateUser } from "./user/express-update-user";
import { GetReport } from "./report/express-get-report";
import { GetExpenses } from "./expense/express-get-expenses";

export const router = express.Router();

router.get("/api/v1/ping", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send("pong");
});

router.post("/api/v1/create-account", CreateAccount);

router.post("/api/v1/login", Login);

router.post("/api/v1/expense", BearerTokenMiddleware, CreateExpense);

router.get("/api/v1/expenses", BearerTokenMiddleware, GetExpenses);

router.get("/api/v1/github-oauth", GithubAuth);

router.get("/api/v1/github-oauth-response", GithubAuthResponse);

router.patch("/api/v1/user/:id", BearerTokenMiddleware, UpdateUser);

router.get("/api/v1/report", BearerTokenMiddleware, GetReport);
