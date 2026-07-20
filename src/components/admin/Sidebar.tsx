import { useState } from "react";
import {
  FaChartLine,
  FaTshirt,
  FaPlusCircle,
  FaShoppingBag,
  FaUsers,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import SidebarItem from "./SidebarItem";

const navItems = [
  { icon: FaChartLine, label: "Dashboard", to: "/admin/dashboard" },
  { icon: FaTshirt, label: "Manage Products", to: "/admin/products" },
  { icon: FaPlusCircle, label: "Add Product", to: "/admin/add-product" },
  { icon: FaShoppingBag, label: "Orders", to: "/admin/orders" },
  { icon: FaUsers, label: "Users", to: "/admin/users" },
  { icon: FaChartBar, label: "Analytics", to: "/admin/analytics" },
  { icon: FaCog, label: "Settings", to: "/admin/settings" },
];

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1F3A] text-white shadow-lg lg:hidden"
        aria-label="Open menu"
      >
        <FaBars />
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#0B1F3A] transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#E0A421] bg-[#0B1F3A]">
              <span className="text-xs font-black text-[#E0A421]">FK</span>
            </div>
            <div>
              <p className="text-base font-black leading-none text-white">
                Fan<span className="text-[#E0A421]">Kit</span>
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Admin Panel
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeMobile}
            className="text-slate-400 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-6">
          {navItems.map((item) => (
            <SidebarItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              onClick={closeMobile}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 px-6 py-4">
          <p className="text-[11px] text-slate-500">FanKit Admin · v1.0</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
