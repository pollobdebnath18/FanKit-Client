import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import {
  FaBell,
  FaChevronDown,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { authClient } from "../../lib/auth-client";
import { useCurrentUser } from "../../hooks/useCurrentUser";

// Maps the last URL segment to a readable page title
const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  products: "Manage Products",
  "add-product": "Add Product",
  orders: "Manage Orders",
  users: "Manage Users",
  analytics: "Analytics",
  settings: "Settings",
};

const Topbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useCurrentUser();

  const currentSegment =
    location.pathname.split("/").filter(Boolean).pop() ?? "dashboard";
  const pageTitle = pageTitles[currentSegment] ?? "Dashboard";

  // Close dropdown when clicking outside it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate("/signin", { replace: true });
  };

  const displayName = currentUser?.name ?? "Admin";
  const displayRole = currentUser?.role ?? "admin";
  const initials = displayName
    .split(" ")
    .map((part: string) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 pl-16 shadow-sm sm:px-6 lg:pl-6">
      {/* Page title and navigation links */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
          {pageTitle}
        </h1>
        <div className="hidden sm:flex items-center gap-1.5 text-sm ml-6">
          <Link
            to="/"
            className="px-3 py-1.5 text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-100 rounded-md font-semibold transition-all"
          >
            Home
          </Link>
          <Link
            to="/collections"
            className="px-3 py-1.5 text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-100 rounded-md font-semibold transition-all"
          >
            Collection
          </Link>
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Notifications */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Notifications"
        >
          <FaBell className="text-lg" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#D6392E]" />
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-slate-100 sm:pr-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1F3A] text-xs font-bold text-[#E0A421]">
              {initials || <FaUserCircle className="text-lg text-white" />}
            </div>
            <span className="hidden text-sm font-semibold text-slate-700 sm:block">
              {displayName}
            </span>
            <FaChevronDown
              className={`hidden text-xs text-slate-400 transition-transform sm:block ${isDropdownOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">
                  {displayName}
                </p>
                <p className="mt-0.5 inline-block rounded-full bg-[#0B1F3A]/5 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#0B1F3A]">
                  {displayRole}
                </p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium text-[#D6392E] transition-colors hover:bg-red-50"
              >
                <FaSignOutAlt />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
