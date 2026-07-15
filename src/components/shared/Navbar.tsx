import { useState } from "react";
import type { FC } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaSearch,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../../assets/fankit-logo.svg";
import { authClient } from "../../lib/auth-client";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: session, isPending, error } = authClient.useSession();
  const { currentUser } = useCurrentUser();
  console.log(currentUser);

  console.log("Session:", session?.user);
  console.log("Pending:", isPending);
  console.log("Error:", error);

  if (isPending) {
    return <nav className="navbar">Loading...</nav>;
  }
  // console.log(session);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Collections", href: "/collections" },

    // Show only after login
    ...(session?.user
      ? [
          { label: "Shop", href: "/shop" },
          { label: "Blog", href: "/blog" },
        ]
      : []),

    { label: "Contact", href: "/contact" },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

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
            {navItems.map((item, idx) => (
              <motion.div
                key={item.href}
                custom={idx}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  to={item.href}
                  className="px-4 py-2 text-gray-700 font-medium rounded-lg transition-all hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Section - Icons & Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors hidden md:flex items-center justify-center"
            >
              <FaSearch className="w-5 h-5" />
            </motion.button>

            {/* Cart Icon */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <FaShoppingCart className="w-5 h-5" />
                <span className="absolute top-2 -right-3.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
            </motion.div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : session?.user ? (
                <>
                  <img
                    src={
                      session.user.image ||
                      `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(session.user.name)}`
                    }
                    alt={session.user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  />

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
                    className="px-5 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/signin"
                      className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all"
                    >
                      Sign In
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/signup"
                      className="px-6 py-2 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                      Get Started
                    </Link>
                  </motion.div>
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
                to="/account"
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <FaUser className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
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
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="hidden md:flex pb-4"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search jerseys, players..."
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  autoFocus
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden border-t border-gray-200 bg-gray-50"
            >
              <nav className="flex flex-col gap-2 p-4">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.href}
                    custom={idx}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      to={item.href}
                      className="block px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Auth Mobile Menu */}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
                  {session?.user ? (
                    <>
                      <div className="flex items-center gap-3 px-2 py-2">
                        <img
                          src={
                            session.user.image ||
                            `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(session.user.name)}`
                          }
                          alt={session.user.name}
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
                        to="/dashboard"
                        className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>

                      <Link
                        to="/orders"
                        className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Orders
                      </Link>

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
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>

                      <Link
                        to="/signup"
                        className="px-4 py-2 text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Get Started
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
