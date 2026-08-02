import { Link, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { authClient } from "../../lib/auth-client";
import { NAV_ITEMS, isNavSection } from "./navItems";
import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onToggleCollapsed: () => void;
}

const LogoMark = () => (
  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-sky-500 text-sm font-black text-primary-content shadow-md shadow-primary/30">
    F
  </div>
);

const Sidebar = ({
  collapsed,
  mobileOpen,
  onCloseMobile,
  onToggleCollapsed,
}: SidebarProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleNavigate = () => onCloseMobile();

  const handleLogout = async () => {
    await authClient.signOut();
    queryClient.invalidateQueries({ queryKey: ["current-user"] });
    onCloseMobile();
    navigate("/signin", { replace: true });
  };

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onCloseMobile}
            className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col bg-brand text-white transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          collapsed ? "lg:w-[76px]" : "lg:w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        aria-label="Admin navigation"
      >
        {/* Brand header */}
        <div
          className={`flex items-center gap-3 border-b border-white/10 py-5 ${
            collapsed ? "justify-center px-2" : "px-5"
          }`}
        >
          <LogoMark />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-black leading-none text-white">
                Fan<span className="text-primary">Kit</span>
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Admin Panel
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={onToggleCollapsed}
            className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white lg:flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <FaChevronRight className="h-3.5 w-3.5" />
            ) : (
              <FaChevronLeft className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            type="button"
            onClick={onCloseMobile}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-scroll flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) =>
            isNavSection(item) ? (
              <SidebarSection
                key={item.label}
                section={item}
                collapsed={collapsed}
                onExpand={onToggleCollapsed}
                onNavigate={handleNavigate}
              />
            ) : (
              <SidebarItem
                key={item.to}
                link={item}
                collapsed={collapsed}
                onNavigate={handleNavigate}
              />
            ),
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-3">
          <div className="space-y-1">
            <div
              className={collapsed ? "tooltip tooltip-right" : ""}
              data-tip={collapsed ? "Back to Website" : undefined}
            >
              <Link
                to="/"
                onClick={handleNavigate}
                className={`flex items-center rounded-xl py-2.5 text-sm font-semibold text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white ${
                  collapsed ? "justify-center" : "gap-3 px-3.5"
                }`}
              >
                <FaArrowLeft className="h-[18px] w-[18px] shrink-0" />
                {!collapsed && <span className="truncate">Back to Website</span>}
              </Link>
            </div>
            <div
              className={collapsed ? "tooltip tooltip-right" : ""}
              data-tip={collapsed ? "Logout" : undefined}
            >
              <button
                type="button"
                onClick={handleLogout}
                className={`flex w-full items-center rounded-xl py-2.5 text-sm font-semibold text-red-300 transition-all duration-200 hover:bg-red-500/10 hover:text-red-200 ${
                  collapsed ? "justify-center" : "gap-3 px-3.5"
                }`}
              >
                <FaSignOutAlt className="h-[18px] w-[18px] shrink-0" />
                {!collapsed && <span className="truncate">Logout</span>}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
