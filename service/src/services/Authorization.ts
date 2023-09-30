import jwt from "jsonwebtoken";
import { Err, Ok, Result } from "ts-results";
import { AccountService } from "../services";

export const verify = async (
  token: string,
): Promise<Result<boolean, Error>> => {
  const secret = process.env.JWT_SECRET as string;

  try {
    const result = jwt.verify(token, secret) as { data: string };
    const email = result.data;

    if (email === undefined || null) {
      return Err(new Error("Invalid Authorization header"));
    }

    const account = await AccountService.findByEmail(email);

    if (account === null) {
      return Err(new Error("Invalid Authorization header"));
    }

    if (account.role !== "ADMIN") {
      return Err(new Error("Account does not have admin permissions."));
    }
  } catch (error) {
    return Err(new Error("Invalid Authorization header"));
  }

  return Ok(true);
};

export const emailFromToken = async (
  token: string,
): Promise<Result<string, Error>> => {
  if (token === undefined || null) {
    return Err(new Error("Missing Authorization header"));
  }

  const tokenWithoutBearerPrefix = token.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return Err(new Error("JWT_SECRET not set"));
  }

  try {
    const result = jwt.verify(tokenWithoutBearerPrefix, secret) as {
      data: string;
    };
    const email = result.data;

    if (email === undefined || null) {
      return Err(new Error("Invalid Authorization header"));
    }

    return Ok(email);
  } catch (error) {
    return Err(new Error("Invalid Authorization header"));
  }
};
