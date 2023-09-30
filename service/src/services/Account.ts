import { Account } from "@prisma/client";
import { prisma } from "../infrastructure/db";
import { Ok, Err, Result } from "ts-results";
import bcrypt from "bcrypt";

export const findByEmail = async (email: string): Promise<Account | null> => {
  const account = await prisma.account.findFirst({
    where: { email: email },
  });

  if (!account) {
    return null;
  }

  return account;
};

export const create = async (
  email: string,
  password: string,
  role = "USER",
): Promise<Result<Account, Error>> => {
  const existingAccount = await findByEmail(email);

  if (existingAccount !== null) {
    return Err(new Error("Account already exists"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAccount = await prisma.account.create({
    data: {
      email: email,
      password: hashedPassword,
      role: role,
    },
  });

  return Ok(newAccount);
};
