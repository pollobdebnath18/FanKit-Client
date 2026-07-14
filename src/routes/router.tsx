import { createBrowserRouter } from "react-router";
import { MainRoutes } from "./MainRoutes";
import { AdminRoutes } from "./AdminRoutes";

export const router = createBrowserRouter([MainRoutes, AdminRoutes]);
