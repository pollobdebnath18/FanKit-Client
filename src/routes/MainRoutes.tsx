import MainLayout from "../layout/MainLaout";

import HomePage from "../pages/homepage/HomePage";
import SignInPage from "../pages/auth/SignInPage";
import SignUpPage from "../pages/auth/SignUpPage";
import ErrorPage from "../components/error/ErrorPage";
import ProductDetails from "../pages/products/ProductDetails";
import Shop from "../pages/shop/Shop";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Blog from "../pages/blog/Blog";
// import Collections from "../pages/collections/Collections";

export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  errorElement: <ErrorPage />,

  children: [
    {
      index: true,
      element: <HomePage />,
    },
    { path: "products/:id", Component: ProductDetails },
    { path: "/", element: <h1>Home</h1> },
    {
      path: "about",
      Component: About,
    },
    { path: "blog", Component: Blog },

    {
      path: "shop",
      Component: Shop,
    },
    // { path: "collections", Component: Collections },
    {
      path: "contact",
      Component: Contact,
    },

    {
      path: "signin",
      element: <SignInPage />,
    },

    {
      path: "signup",
      element: <SignUpPage />,
    },

    {
      path: "profile",
      element: <h1>User Profile</h1>,
    },

    {
      path: "orders",
      element: <h1>My Orders</h1>,
    },

    {
      path: "wishlist",
      element: <h1>Wishlist</h1>,
    },
  ],
};
