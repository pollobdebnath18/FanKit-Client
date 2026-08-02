import { Link, useLocation, useNavigate } from "react-router";
import { FaBars, FaChevronDown, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { authClient } from "../../lib/auth-client";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { getAdminPageMeta } from "./navItems";
import Breadcrumb from "./ui/Breadcrumb";
import SearchBar from "./ui/SearchBar";

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();

  const { title, crumbs } = getAdminPageMeta(location.pathname);

  const displayName = currentUser?.name ?? "Admin";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleSearch = (value: string) => {
    if (!value) return;
    navigate(`/admin/products?search=${encodeURIComponent(value)}`);
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    queryClient.invalidateQueries({ queryKey: ["current-user"] });
    navigate("/signin", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/85 px-4 backdrop-blur sm:gap-4 sm:px-6">
      {/* Left: menu toggle + breadcrumb */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
          aria-label="Toggle navigation menu"
        >
          <FaBars className="h-4 w-4" />
        </button>

        <div className="hidden h-6 w-px bg-slate-200 sm:block" />

        <div className="min-w-0">
          <h1 className="truncate text-base font-bold text-slate-900 sm:text-lg">
            {title}
          </h1>
          <div className="hidden sm:block">
            <Breadcrumb items={crumbs} />
          </div>
        </div>
      </div>

      {/* Center: global search */}
      <div className="hidden w-full max-w-md md:block">
        <SearchBar
          placeholder="Search products, orders, users..."
          onSubmit={handleSearch}
        />
      </div>

      {/* Right: profile dropdown */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <div className="dropdown dropdown-end">
          <button
            type="button"
            tabIndex={0}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:pr-3"
            aria-label="Account menu"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-primary text-xs font-bold text-white shadow-sm">
              {initials}
            </div>
            <span className="hidden text-sm font-semibold text-slate-700 lg:block">
              {displayName}
            </span>
            <FaChevronDown className="hidden text-xs text-slate-400 lg:block" />
          </button>

          <div
            tabIndex={0}
            className="dropdown-content z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
          >
            <div className="border-b border-slate-100 px-3 py-2.5">
              <p className="truncate text-sm font-semibold text-slate-900">
                {displayName}
              </p>
              <p className="mt-0.5 truncate text-xs text-slate-400">
                {currentUser?.email}
              </p>
            </div>
            <div className="py-1">
              <Link
                to="/profile"
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <FaUser className="h-3.5 w-3.5 text-slate-400" />
                Profile
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <FaCog className="h-3.5 w-3.5 text-slate-400" />
                Settings
              </Link>
            </div>
            <div className="border-t border-slate-100 py-1">
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <FaSignOutAlt className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
