import { NavLink } from "react-router";
import type { IconType } from "react-icons";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  to: string;
  end?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  icon: Icon,
  label,
  to,
  end = false,
  onClick,
}: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
          isActive
            ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
            : "text-slate-300 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      <Icon className="text-lg" />
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarItem;
