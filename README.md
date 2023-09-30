# Hack The Tunnels - Starter

![Hack The Tunnels](https://i.imgur.com/hfdpJca.png)

This is the project template for [Hack The Tunnels](https://ccss.carleton.ca/hackthetunnels/).

The project template utilizes [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Express](https://expressjs.com/), and [Prisma](https://www.prisma.io/).

## Project Setup

Before you can set up the project, you will need to install [Node.js](https://nodejs.org/en).

To get the project working, you will need to have both the client and server running.

### Client Setup

1. Move into the client directory

```
cd client
```

2. Install client dependencies

```
npm install
```

3. Copy `.env.sample`

Create a copy of the `.env.sample` file and rename the file's name to `.env`.


4. Run the client

```
npm run dev
```

### Service Setup

1. Move into the service directory

```
cd service
```

2. Install service dependencies

```
npm install
```

3. Copy `.env.sample`

Create a copy of the `.env.sample` file and rename the file's name to `.env`.

4. Run Migrations

```
npx prisma migrate dev
```

5. Add the Seed Data

```
npx prisma db seed
```

6. Run the service

```
npm run dev
```

# Important Files and Folders

## Client

- `main.tsx`: Initialises app and describes routing for pages
- `client/src/pages`: Where pages are stored
- `client/src/components`: Where components are stored
- `client/src/infrastructure/ServiceAPI`: Where Service API functions are stored

## Service

- `service/src/infrastructure/api/router.ts`: Main router location
- `service/src/infrastructure/api/routes`: Where all other routers are stored
- `service/src/services`: Services are where business logic live
- `service/src/infrastructure/db/schema.prisma`: This file is utilized by the Prisma ORM to generate migrations and types

# Key Words

## Product

- Represents a product with the following fields:
  - `id`: An auto-incremented integer serving as the primary key.
  - `title`: A string representing the product's title.
  - `description`: An optional string for the product's description.
  - `price`: A floating-point number representing the product's price.
  - `imageUrl`: An optional string for the product's image URL.
  - `lineItems`: A relation to the "LineItem" model, indicating that a product can be associated with multiple line items in orders.


## Order

- Represents an order with the following fields:
  - `id`: An auto-incremented integer serving as the primary key.
  - `customer`: A relation to the "Customer" model, specifying the customer who placed the order.
  - `customerId`: An integer representing the customer's ID.
  - `lineItems`: A relation to the "LineItem" model, indicating that an order can have multiple line items.

## Line Item

- A Line Item is one item purchased on an Order. Think of an Order like a receipt, and a line Item is one line on the receipt.
  - `id`: An auto-incremented integer serving as the primary key.
  - `quantity`: An integer representing the quantity of the product in the order.
  - `cost`: A floating-point number representing the cost of the line item.
  - `product`: A relation to the "Product" model, indicating the product associated with the line item.
  - `productId`: An integer representing the product's ID.
  - `order`: A relation to the "Order" model, specifying the order to which the line item belongs.
  - `orderId`: An integer representing the order's ID.


## Customer

- A customer is the person who created the order
  - `id`: An auto-incremented integer serving as the primary key.
  - `name`: An optional string representing the customer's name.
  - `email`: A string representing the customer's email address.
  - `orders`: A relation to the "Order" model, specifying that a customer can have multiple orders.

## Account

- Represents user accounts with the following fields:
  - `id`: An auto-incremented integer serving as the primary key.
  - `email`: A unique string representing the email address associated with the account.
  - `password`: A string representing the account password.
  - `role`: A string representing the role of the account (e.g., ADMIN, USER). ADMIN users have all permissions.
  - `createdAt`: A timestamp representing when the account was created.
  - `updatedAt`: A timestamp that is updated whenever the account information is modified.

# More Useful Commands

## Open Prisma Studio

[Prisma Studio](https://www.prisma.io/studio) is the easiest way to explore and manipulate your data in all of your Prisma projects.

```
npx prisma studio
```
