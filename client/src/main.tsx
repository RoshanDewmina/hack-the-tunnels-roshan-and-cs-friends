import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import {
  Admin,
  Checkout,
  CreateProduct,
  Home,
  Login,
  Product,
  SignUp,
} from "./pages";
import { AccountProvider } from "./context";
import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/checkout/:productId",
    element: <Checkout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/products/:id",
    element: <Product />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/admin/create-product",
    element: <CreateProduct />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

export function Root() {
  const [cookie] = useCookies(["jwt"]);

  return (
    <AccountProvider storedToken={cookie.jwt}>
      <RouterProvider router={router} />
    </AccountProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider>
      <Root />
    </CookiesProvider>
  </React.StrictMode>,
);
