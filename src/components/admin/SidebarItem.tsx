import { NavLink } from "react-router";
import type { AdminNavLink } from "./navItems";

interface SidebarItemProps {
  link: AdminNavLink;
  collapsed: boolean;
  onNavigate?: () => void;
}

const SidebarItem = ({ link, collapsed, onNavigate }: SidebarItemProps) => (
  <div
    className={collapsed ? "tooltip tooltip-right" : ""}
    data-tip={collapsed ? link.label : undefined}
  >
    <NavLink
      to={link.to}
      end={link.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
          collapsed ? "justify-center" : "gap-3 px-3.5"
        } ${
          isActive
            ? "bg-primary text-white shadow-md shadow-primary/30"
            : "text-slate-300 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      <link.icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && <span className="truncate">{link.label}</span>}
    </NavLink>
  </div>
);

export default SidebarItem;
