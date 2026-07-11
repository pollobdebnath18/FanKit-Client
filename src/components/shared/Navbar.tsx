import type { FC } from "react";
import { Link } from "react-router";
import logo from "../../assets/fankit-logo.svg";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const Navbar: FC = () => {
  return (
    <header className="navbar sticky top-0 z-50 border-b border-base-300 bg-base-100/95 px-4 shadow-sm backdrop-blur">
      <div className="navbar-start gap-2">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {navItems.map((item) => (
              <li key={item.href}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-base-200"
        >
          <img src={logo} alt="FanKit logo" className="h-14 w-14" />
          <span className="text-4xl font-bold tracking-tight text-base-content">
            FanKit
          </span>
        </Link>
      </div>

      <nav className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1 px-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="rounded-full px-4 font-medium hover:bg-base-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="navbar-end gap-2">
        <Link
          to="/signin"
          className="btn btn-ghost btn-sm hidden sm:inline-flex"
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          className="btn btn-sm bg-sky-600 text-white hover:bg-sky-700"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
