import { Customer, Order } from "@prisma/client";
import { Err, Ok, Result } from "ts-results";
import { prisma } from "../infrastructure/db";
import { CustomerService, ProductService } from "../services";

export const find = async (id: string): Promise<Result<Order, Error>> => {
  const order = await prisma.order.findFirst({
    where: { id: parseInt(id) },
    include: {
      customer: true,
      lineItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (order === null) {
    return Err(new Error("Order not found"));
  }

  return Ok(order);
};

interface CustomerInput {
  name: string;
  email: string;
}

interface LineItemInput {
  productId: string;
  quantity: number;
}

export const create = async (
  customerInput: CustomerInput,
  lineItems: LineItemInput[],
): Promise<Result<Order, Error>> => {
  // validate that lineitems is not empty
  if (lineItems === undefined || null) {
    return Err(new Error("Order must have at least one line item"));
  }

  // validate that customer is present
  if (customerInput === undefined || null) {
    return Err(new Error("Customer is required"));
  }

  // find or create customer
  const customerResult = await CustomerService.findOrCreateCustomer(
    customerInput.name,
    customerInput.email,
  );

  if (customerResult.err) {
    return customerResult;
  }

  const customer = customerResult.val as Customer;

  // find all products associated with the desired line items
  const products = await ProductService.findMany(
    lineItems.map((item) => item.productId),
  );

  if (products.length !== lineItems.length) {
    return Err(new Error("Some desired product does not exist"));
  }

  // try to create the order
  try {
    const order = await prisma.order.create({
      data: {
        customer: {
          connect: {
            id: customer.id,
          },
        },
        lineItems: {
          create: lineItems.map((item) => ({
            product: {
              connect: {
                id: products.find(
                  (product) => product.id === parseInt(item.productId),
                )?.id as number,
              },
            },
            quantity: item.quantity,
            cost: products.find(
              (product) => product.id === parseInt(item.productId),
            )?.price as number,
          })),
        },
      },
      include: {
        customer: true,
        lineItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return Ok(order);
  } catch (error) {
    return Err(new Error(error.message));
  }
};
