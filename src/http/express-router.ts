import express from "express";
import { CreateAccount } from "./express-creat-account";

export const router = express.Router();

router.get("/api/v1/ping", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send("pong");
});

router.post("/api/v1/create-account", CreateAccount);
