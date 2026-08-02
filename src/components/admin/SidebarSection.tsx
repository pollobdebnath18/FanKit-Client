import { useState } from "react";
import { useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import type { AdminNavSection } from "./navItems";
import SidebarItem from "./SidebarItem";

interface SidebarSectionProps {
  section: AdminNavSection;
  collapsed: boolean;
  onExpand?: () => void;
  onNavigate?: () => void;
}

const hasActiveChild = (children: { to: string }[], pathname: string) =>
  children.some((child) => {
    if (child.to === "/admin") return pathname === "/admin";
    return pathname === child.to || pathname.startsWith(`${child.to}/`);
  });

const SidebarSection = ({
  section,
  collapsed,
  onExpand,
  onNavigate,
}: SidebarSectionProps) => {
  const { pathname } = useLocation();
  const active = hasActiveChild(section.children, pathname);
  const [open, setOpen] = useState(active);

  const handleHeaderClick = () => {
    if (collapsed) {
      onExpand?.();
      return;
    }
    setOpen((prev) => !prev);
  };

  const header = (
    <button
      type="button"
      onClick={handleHeaderClick}
      aria-expanded={collapsed ? undefined : open}
      aria-label={collapsed ? section.label : undefined}
      className={`flex w-full items-center rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
        collapsed ? "justify-center" : "gap-3 px-3.5"
      } ${
        active
          ? "bg-white/10 text-white"
          : "text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      <section.icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1 truncate text-left">{section.label}</span>
          <FaChevronDown
            className={`h-2.5 w-2.5 text-slate-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </>
      )}
    </button>
  );

  return (
    <div>
      {collapsed ? (
        <div className="tooltip tooltip-right" data-tip={section.label}>
          {header}
        </div>
      ) : (
        header
      )}

      {!collapsed && (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ul className="mb-1 ml-[18px] mt-1 space-y-1 border-l border-white/10 pl-3">
                {section.children.map((child) => (
                  <li key={child.to}>
                    <SidebarItem
                      link={child}
                      collapsed={false}
                      onNavigate={onNavigate}
                    />
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default SidebarSection;
