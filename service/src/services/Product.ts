import { Product } from "@prisma/client";
import { prisma } from "../infrastructure/db";

export const all = async (): Promise<Product[]> => {
  const products = await prisma.product.findMany();
  return products;
};

export const find = async (id: string): Promise<Product | null> => {
  const product = await prisma.product.findFirst({
    where: { id: parseInt(id) },
  });

  return product;
};

export const findMany = async (ids: string[]): Promise<Product[]> => {
  const products = await prisma.product.findMany({
    where: { id: { in: ids.map((id) => parseInt(id)) } },
  });

  return products;
};

export const create = async (
  title: string,
  description: string,
  price: number,
  imageUrl: string = "https://i.imgur.com/EyoQOjC.jpg",
): Promise<Product> => {
  const newProduct = await prisma.product.create({
    data: {
      title: title,
      description: description,
      price: price,
      imageUrl: imageUrl,
    },
  });

  return newProduct;
};
