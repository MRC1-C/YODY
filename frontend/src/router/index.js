import Cart from "pages/Cart";
import History from "pages/History";
import Home from "pages/Home";
import Product from "pages/Product";

export const PRIVATE_ROUTER = [
  {
    key: "home",
    label: "Index",
    component: Home,
    path: "/",
    exact: true,
  },
  {
    key: "history",
    label: "History",
    component: History,
    path: "/history",
    exact: true,
  },
  {
    key: "cart",
    label: "cart",
    component: Cart,
    path: "/cart",
    exact: true,
  },
  {
    key: "product",
    label: "Product",
    component: Product,
    path: "/:id",
    exact: true,
  },
];
