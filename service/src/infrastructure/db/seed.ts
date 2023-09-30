import { AccountService, ProductService } from "../../services";

const seed = async () => {
  const admin = await AccountService.create(
    "admin@email.com",
    "password",
    "ADMIN",
  );
  const user = await AccountService.create("user@email.com", "password");

  const exampleProduct = await ProductService.create(
    "Example Product #1",
    "This is an example product",
    10.99,
  );

  const exampleProduct2 = await ProductService.create(
    "Example Product #2",
    "This is an example product",
    10.99,
  );

  const exampleProduct3 = await ProductService.create(
    "Example Product #3",
    "This is an example product",
    10.99,
  );
};

seed();
