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
- `service/src/services`: On our website we might have specific tasks like making a product, buying a product, checking email and passwords, etc. "Services" are responsible for doing those specific tasks.
- `service/src/infrastructure/db/schema.prisma`: Contains important information about how to create and organize things in our program. It's like a recipe book and Prisma(the software) follows the 'recipe' to create and organize data on our website.

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

- A Line Item is one item of the Order. Think of an Order like a receipt, and a line Item is one line on the receipt.
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

# Glossary

- `auto-incremented`: This is used for `id`s. This means that each time a new product is added to a list, the id number goes up by one. So, if the last product had an id of 5, the next one will have an id of 6.
- `routing`: Think of a city with many streets, each leading to a different place, like parks, schools, or stores. In a city, when you want to go from one place to another, you follow the right streets to get there. This process of finding your way to different places is a bit like routing.
- `router`: In the world of technology, a "router" is like a guidebook that shows all the streets and places in the city. It's a tool that helps guide information from one place to another on the internet or in a computer program.
- `API`: Imagine you have a machine that does many different tasks. The machine has special control panel with buttons that you can use to tell it what you want it to do. API(Application Programming Interface) is like the control panel between you and the machine. It's a way for you to request something (data or a task) from the machine (software or database). Just as you use the button to get the machine to do a task, software uses APIs to request information or actions.
- `primary key`: It's like a special tag or label that you put on each item in your collection to make sure you can always find it quickly. One example would be your student id.
- `component`: A component is like a LEGO piece. Each LEGO piece has a specific shape and purpose. When you build LEGO, you assemble these pieces in different ways to create what you need. With a website, these components can be combined in different ways to create different parts of a web page or application.
- `relation`: Think of a "relation" as a connection or link between two things or people. In terms of a website, a customer can have multiple orders and have connections to them. Those orders can have multiple products which means connections to those products.

# More Useful Commands

## Open Prisma Studio

[Prisma Studio](https://www.prisma.io/studio) is the easiest way to explore and manipulate your data in all of your Prisma projects.

```
npx prisma studio
```
