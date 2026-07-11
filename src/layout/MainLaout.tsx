import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";

const MainLaout = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="mx-auto max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLaout;