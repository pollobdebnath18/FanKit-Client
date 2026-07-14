import MainLayout from "../layout/MainLaout";

import HomePage from "../pages/homepage/HomePage";
import SignInPage from "../pages/auth/SignInPage";
import SignUpPage from "../pages/auth/SignUpPage";
import ErrorPage from "../components/error/ErrorPage";

export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  errorElement: <ErrorPage />,

  children: [
    {
      index: true,
      element: <HomePage />,
    },

    {
      path: "shop",
      element: <h1>Shop</h1>,
    },

    {
      path: "about",
      element: <h1>About</h1>,
    },

    {
      path: "contact",
      element: <h1>Contact</h1>,
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
