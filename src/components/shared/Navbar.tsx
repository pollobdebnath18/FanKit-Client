import { useEffect, useState } from "react";
import type { FC } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaSearch,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaHeart,
} from "react-icons/fa";
import logo from "../../assets/fankit-logo.svg";
import { authClient } from "../../lib/auth-client";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import {
  desktopNavItems,
  navItems,
  type NavGroup,
  type NavLinkItem,
} from "./navItems";

// ---------- Active-state helpers ----------
const isGrouped = (menu: NavLinkItem[] | NavGroup[]): menu is NavGroup[] =>
  Array.isArray(menu) && menu.length > 0 && "group" in menu[0];

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();
  const { currentUser } = useCurrentUser();

  const isAdmin = currentUser?.role === "admin";

  // Close dropdowns / mobile menu on navigation (React "adjust state during render" pattern)
  const locationKey = `${pathname}${search}`;
  const [prevLocationKey, setPrevLocationKey] = useState(locationKey);
  if (prevLocationKey !== locationKey) {
    setPrevLocationKey(locationKey);
    setOpenDropdown(null);
    setIsMenuOpen(false);
  }

  // Fetch live cart count when logged in
  const userId = session?.user?.id;
  const [prevUserId, setPrevUserId] = useState<string | undefined>(userId);
  if (prevUserId !== userId) {
    setPrevUserId(userId);
    if (!userId) {
      setCartCount(0);
    }
  }

  useEffect(() => {
    if (!userId) return;
    const baseURL =
      import.meta.env.VITE_AUTH_API_URL ||
      import.meta.env.VITE_API_BASE_URL ||
      "";
    fetch(`${baseURL}/api/cart`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        const items = data?.cart?.items ?? [];
        setCartCount(
          items.reduce(
            (sum: number, item: { quantity?: number }) =>
              sum + (item.quantity ?? 0),
            0,
          ),
        );
      })
      .catch(() => setCartCount(0));
  }, [userId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // ---------- Dropdown link rendering ----------
  const renderMenuContent = (menu: NavLinkItem[] | NavGroup[]) => (
    <div className={isGrouped(menu) ? "w-auto min-w-[560px]" : "w-60 max-w-xs"}>
      {isGrouped(menu) ? (
        <div className="grid grid-cols-3 gap-4">
          {menu.map((group) => (
            <div key={group.group}>
              <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#F5A623]">
                {group.group}
              </p>
              <div>
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block rounded-lg px-3 py-1.5 text-sm text-gray-700 transition hover:bg-[#2563EB]/10 hover:text-[#1D4ED8]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-0.5">
          {menu.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="block rounded-lg px-3 py-1.5 text-sm text-gray-700 transition hover:bg-[#2563EB]/10 hover:text-[#1D4ED8]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  // ---------- Mobile menu content (flattened) ----------
  const renderMobileMenu = (menu: NavLinkItem[] | NavGroup[]) => {
    if (isGrouped(menu)) {
      return menu.flatMap((group) =>
        group.links.map((link) => (
          <NavLink
            key={`${group.group}-${link.label}`}
            to={link.href}
            className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-[#2563EB]/10 hover:text-[#1D4ED8]"
          >
            {group.group} › {link.label}
          </NavLink>
        )),
      );
    }
    return menu.map((link) => (
      <NavLink
        key={link.label}
        to={link.href}
        className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-[#2563EB]/10 hover:text-[#1D4ED8]"
      >
        {link.label}
      </NavLink>
    ));
  };

  const linkBase =
    "px-1.5 xl:px-2 2xl:px-4 py-1.5 xl:py-2 text-sm xl:text-base font-semibold rounded-lg transition-all whitespace-nowrap";
  const linkInactive =
    "text-gray-700 hover:text-[#1D4ED8] hover:underline hover:underline-offset-4 hover:decoration-[#F5A623] decoration-2";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between h-16 md:h-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <Link
              to="/"
              className="flex items-center gap-2 transition-all hover:opacity-80"
            >
              <img
                src={logo}
                alt="FanKit logo"
                className="h-10 w-10 md:h-12 md:w-12"
              />
              <span className="text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                FanKit
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.type === "link") {
                return (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    end={item.end}
                    className={`${item.label === "Home" ? "hidden xl:flex" : ""} ${linkBase} ${linkInactive}`}
                  >
                    {item.label}
                  </NavLink>
                );
              }
              const open = openDropdown === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div className="flex items-center">
                    <Link
                      to={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className={`${linkBase} ${linkInactive}`}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(open ? null : item.label)}
                      aria-label={`Open ${item.label} menu`}
                      aria-expanded={open}
                      className="flex items-center p-1.5 -ml-1.5 xl:-ml-2 2xl:-ml-4 text-gray-500 transition hover:text-[#1D4ED8]"
                    >
                      <FaChevronDown
                        className={`text-xs transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full z-50 pt-2"
                      >
                        <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                          {renderMenuContent(item.menu)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right Section - Icons & Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 hover:text-[#2563EB] transition-colors hidden md:flex items-center justify-center"
              aria-label="Search"
            >
              <FaSearch className="w-5 h-5" />
            </motion.button>

            {/* Wishlist Icon */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                to="/wishlist"
                className="p-2 text-gray-700 hover:text-[#2563EB] transition-colors hidden md:flex items-center justify-center"
                aria-label="Wishlist"
              >
                <FaHeart className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Cart Icon */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-[#2563EB] transition-colors"
                aria-label="Cart"
              >
                <FaShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-2 -right-3.5 w-5 h-5 bg-red-400 text-white/90 text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </motion.div>

            {/* Account (Desktop) */}
            <div
              className="hidden md:block relative"
              onMouseEnter={() => setOpenDropdown("Account")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : session?.user ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "Account" ? null : "Account",
                      )
                    }
                    className="flex items-center gap-1.5 p-1 text-gray-700 hover:text-[#1D4ED8] transition-colors"
                    aria-expanded={openDropdown === "Account"}
                  >
                    <img
                      src={
                        session?.user?.image ||
                        `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(session.user.name)}`
                      }
                      alt={session?.user?.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#2563EB]"
                    />
                    <FaChevronDown
                      className={`text-xs transition-transform duration-200 ${
                        openDropdown === "Account" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openDropdown === "Account" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full z-50 pt-2"
                      >
                        <div className="w-52 rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                          <div className="border-b border-slate-100 px-3 py-2">
                            <p className="text-sm font-bold text-slate-900 truncate">
                              {session.user.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {session.user.email}
                            </p>
                          </div>
                          <div className="pt-1 space-y-0.5">
                            <Link
                              to="/profile"
                              className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-[#2563EB]/10 hover:text-[#1D4ED8]"
                            >
                              My Profile
                            </Link>
                            <Link
                              to="/orders"
                              className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-[#2563EB]/10 hover:text-[#1D4ED8]"
                            >
                              My Orders
                            </Link>
                            <Link
                              to="/cart"
                              className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-[#2563EB]/10 hover:text-[#1D4ED8]"
                            >
                              Cart
                            </Link>
                            <Link
                              to="/wishlist"
                              className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-[#2563EB]/10 hover:text-[#1D4ED8]"
                            >
                              Wishlist
                            </Link>
                            {isAdmin && (
                              <Link
                                to="/admin/dashboard"
                                className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-[#2563EB]/10 hover:text-[#1D4ED8]"
                              >
                                Admin Dashboard
                              </Link>
                            )}
                            <div className="my-1 border-t border-slate-100"></div>
                            <Link
                              to="/about"
                              className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-[#2563EB]/10 hover:text-[#1D4ED8]"
                            >
                              About
                            </Link>
                            <Link
                              to="/blog"
                              className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-[#2563EB]/10 hover:text-[#1D4ED8]"
                            >
                              Blog
                            </Link>
                            <Link
                              to="/contact"
                              className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-[#2563EB]/10 hover:text-[#1D4ED8]"
                            >
                              Contact
                            </Link>
                            <button
                              onClick={async () => {
                                await authClient.signOut({
                                  fetchOptions: {
                                    onSuccess: () => {
                                      window.location.href = "/";
                                    },
                                  },
                                });
                              }}
                              className="w-full text-left rounded-lg px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                            >
                              Sign Out
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Mobile User Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden"
            >
              <Link
                to={session?.user ? "/profile" : "/signin"}
                className="p-2 text-gray-700 hover:text-[#2563EB] transition-colors"
                aria-label="Account"
              >
                <FaUser className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#2563EB] transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Search Bar - Desktop */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="hidden md:flex pb-4"
            >
              <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search products, teams, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  autoFocus
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200 bg-gray-50"
            >
              <nav className="flex flex-col gap-2 p-4">
                {/* Search (mobile) */}
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search products, teams..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                </form>

                {/* Nav links */}
                {desktopNavItems.map((item) => {
                  if (item.type === "link") {
                    return (
                      <NavLink
                        key={item.label}
                        to={item.href}
                        end={item.end}
                        className={`${linkBase} ${linkInactive}`}
                      >
                        {item.label}
                      </NavLink>
                    );
                  }
                  const open = openDropdown === item.label;
                  return (
                    <div key={item.label} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <Link
                          to={item.href}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setOpenDropdown(null);
                          }}
                          className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-all ${linkInactive}`}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdown(open ? null : item.label)
                          }
                          aria-label={`Open ${item.label} menu`}
                          aria-expanded={open}
                          className="px-3 py-2 text-gray-500 transition"
                        >
                          <FaChevronDown
                            className={`text-xs transition-transform duration-200 ${
                              open ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                      {open && (
                        <div className="flex flex-col gap-1 pl-3">
                          {renderMobileMenu(item.menu)}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Auth Mobile Menu */}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
                  {isPending ? (
                    <div className="flex justify-center py-2">
                      <span className="loading loading-spinner loading-sm"></span>
                    </div>
                  ) : session?.user ? (
                    <>
                      <div className="flex items-center gap-3 px-2 py-2">
                        <img
                          src={
                            session?.user?.image ||
                            `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(session.user.name)}`
                          }
                          alt={session?.user?.name}
                          className="w-12 h-12 rounded-full border object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{session.user.name}</h3>
                          <p className="text-sm text-gray-500">
                            {session.user.email}
                          </p>
                        </div>
                      </div>

                      <Link
                        to="/profile"
                        className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                      >
                        My Profile
                      </Link>

                      <Link
                        to="/orders"
                        className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                      >
                        My Orders
                      </Link>

                      <Link
                        to="/cart"
                        className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                      >
                        Cart
                      </Link>

                      <Link
                        to="/wishlist"
                        className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                      >
                        Wishlist
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                        >
                          Admin Dashboard
                        </Link>
                      )}

                      <button
                        onClick={async () => {
                          await authClient.signOut({
                            fetchOptions: {
                              onSuccess: () => {
                                setIsMenuOpen(false);
                                window.location.href = "/";
                              },
                            },
                          });
                        }}
                        className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        className="px-4 py-2 text-center text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition"
                      >
                        Sign In
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
