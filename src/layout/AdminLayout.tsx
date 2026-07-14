import { Outlet } from "react-router";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />

      <div className="flex-1">
        <Topbar></Topbar>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
