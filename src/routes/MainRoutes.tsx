import MainLayout from "../layout/MainLaout";

import HomePage from "../pages/homepage/HomePage";
import SignInPage from "../pages/auth/SignInPage";
import SignUpPage from "../pages/auth/SignUpPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ErrorPage from "../components/error/ErrorPage";
import ProductDetails from "../pages/products/ProductDetails";
import Shop from "../pages/shop/Shop";
import LazyShopCategory from "../pages/shop/LazyShopCategory";
import LazyOffersPage from "../pages/offers/LazyOffersPage";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Wishlist from "../pages/wishlist/Wishlist";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import OrdersPage from "../pages/orders/OrdersPage";
import OrderDetailsPage from "../pages/orders/OrderDetailsPage";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentFailure from "../pages/payment/PaymentFailure";
import PaymentCancel from "../pages/payment/PaymentCancel";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "../pages/profile/ProfilePage";

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

    {
      path: "shop",
      Component: Shop,
    },
    { path: "shop/:category", Component: LazyShopCategory },
    {
      path: "offers",
      Component: LazyOffersPage,
    },
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
      path: "forgot-password",
      element: <ForgotPasswordPage />,
    },

    {
      path: "profile",
      element: (
        <PrivateRoute>
          <ProfilePage />
        </PrivateRoute>
      ),
    },

    {
      path: "orders",
      element: (
        <PrivateRoute>
          <OrdersPage />
        </PrivateRoute>
      ),
    },

    {
      path: "orders/:id",
      element: (
        <PrivateRoute>
          <OrderDetailsPage />
        </PrivateRoute>
      ),
    },

    {
      path: "checkout",
      element: (
        <PrivateRoute>
          <Checkout />
        </PrivateRoute>
      ),
    },

    {
      path: "payment/success",
      element: <PaymentSuccess />,
    },

    {
      path: "payment/failure",
      element: <PaymentFailure />,
    },

    {
      path: "payment/cancel",
      element: <PaymentCancel />,
    },

    {
      path: "wishlist",
      Component: Wishlist,
    },

    {
      path: "cart",
      Component: Cart,
    },
  ],
};
