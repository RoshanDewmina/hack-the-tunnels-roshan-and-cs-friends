import { Err, Ok, Result } from "ts-results";
import { prisma } from "../infrastructure/db";
import { Customer } from "@prisma/client";

export const findOrCreateCustomer = async (
  name: string,
  email: string,
): Promise<Result<Customer, Error>> => {
  if (email === undefined || null) {
    return Err(new Error("Invalid email"));
  }

  const customer = await prisma.customer.findFirst({
    where: { email: email },
  });

  if (customer) {
    return Ok(customer);
  }

  const newCustomer = await prisma.customer.create({
    data: {
      name: name,
      email: email,
    },
  });

  if (!newCustomer) {
    return Err(new Error("Customer could not be created"));
  }

  return Ok(newCustomer);
};
