import ErrorPage from "../components/error/ErrorPage";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import { Navigate } from "react-router";
import AdminRoute from "./AdminRoute"; 
import  AddProduct from "../pages/admin/AddProduct";
import ManageProducts from "../pages/admin/ManageProducts";
import Orders from "../pages/admin/Orders";
import Users from "../pages/admin/Users";
import Analytics from "../pages/admin/Analytics";
import Settings from "../pages/admin/Settings";

export const AdminRoutes = {
  path: "/admin",

  element: (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  ),

  errorElement: <ErrorPage />,

  children: [
    {
      index: true,
      element: <Navigate to="/admin/dashboard" replace />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "products",
      element: <ManageProducts/>,
    },
    {
      path: "add-product",
      element: <AddProduct/>,
    },
    {
      path: "orders",
      element: <Orders/>,
    },
    {
      path: "users",
      element: <Users/>,  
    },
    {
      path: "analytics",
      Component : Analytics,
    },
    {
      path: "settings",
      Component : Settings,
    },
  ],
};
