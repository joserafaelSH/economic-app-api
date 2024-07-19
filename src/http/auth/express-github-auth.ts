import { auth, createAccountGithub, jwt } from "@/factory/factory";
import { Logger } from "@/libs/logger/logger";
import { WinstonLogger } from "@/libs/logger/winston-logger";
import { Request, Response } from "express";

const winstonLogger: Logger = new WinstonLogger("github-logger");

export const GithubAuth = async (req: Request, res: Response) => {
  winstonLogger.logInfo(`Github Auth`);
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
};

export const GithubAuthResponse = async (req: Request, res: Response) => {
  const body = {
    code: req.query.code,
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_SECRET!,
  };

  const opts = { headers: { accept: "application/json" } };

  const url = `https://github.com/login/oauth/access_token`;

  let response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { ...opts.headers, "Content-Type": "application/json" },
  });

  let data = await response.json();

  response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${data.access_token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      accept: "application/json",
    },
  });
  data = await response.json();

  let token = await auth.githubLogin(data.id.toString());
  if (token) {
    res.header("Content-Type", "application/json");
    res.header("Authorization", `Bearer ${token}`);
    res.cookie("authToken", token, { httpOnly: true, secure: true });
    res.redirect("home-redirect");
    return;
  }

  const userData = {
    name: data.login,
    external_id: `${data.id}`,
    avatar: data.avatar_url,
    monthly_budget: 0,
  };

  await createAccountGithub.execute(userData);
  token = await auth.githubLogin(data.id.toString());

  res.header("Content-Type", "application/json");
  res.cookie("authToken", token, { httpOnly: true, secure: true });
  res.redirect("complete-profile-redirect");
  return;
};
