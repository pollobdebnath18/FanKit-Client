import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import type { ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTachometerAlt,
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaUserCog,
  FaSpinner,
  FaRegUser,
} from "react-icons/fa";
import { useAuthSession } from "../../hooks/useAuthSession";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { formatDate } from "../../lib/format";
import ProfileHeader from "../../components/profile/ProfileHeader";
import OverviewPanel from "../../components/profile/OverviewPanel";
import OrdersPanel from "../../components/profile/OrdersPanel";
import WishlistPanel from "../../components/profile/WishlistPanel";
import CartPanel from "../../components/profile/CartPanel";
import AddressesPanel from "../../components/profile/AddressesPanel";
import SettingsPanel from "../../components/profile/SettingsPanel";

type TabKey =
  | "overview"
  | "orders"
  | "wishlist"
  | "cart"
  | "addresses"
  | "settings";

const TABS: { key: TabKey; label: string; Icon: ComponentType<{ className?: string }> }[] = [
  { key: "overview", label: "Overview", Icon: FaTachometerAlt },
  { key: "orders", label: "My Orders", Icon: FaShoppingBag },
  { key: "wishlist", label: "Wishlist", Icon: FaHeart },
  { key: "cart", label: "Cart", Icon: FaShoppingCart },
  { key: "addresses", label: "Addresses", Icon: FaMapMarkerAlt },
  { key: "settings", label: "Settings", Icon: FaUserCog },
];

const VALID_TABS: TabKey[] = TABS.map((t) => t.key);

const ProfilePage = () => {
  const { data: session, isPending: sessionPending } = useAuthSession();
  const { currentUser, isLoading: userLoading } = useCurrentUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as TabKey | null;
  const [activeTab, setActiveTab] = useState<TabKey>(
    tabParam && VALID_TABS.includes(tabParam) ? tabParam : "overview",
  );

  const isLoggedIn = !!session?.user || !!currentUser;

  if (sessionPending || userLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <FaSpinner className="h-8 w-8 animate-spin text-[#2563EB]" />
      </div>
    );
  }

  if (!isLoggedIn || !currentUser) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <FaRegUser className="mb-4 text-5xl text-slate-300" />
        <h1 className="text-xl font-bold text-slate-900">Your Profile</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to view your profile, orders, wishlist and more.
        </p>
        <Link
          to="/signin"
          className="mt-6 rounded-full bg-[#0B1F3A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#132C52]"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const avatar =
    currentUser.image ??
    currentUser.avatar ??
    session?.user?.image ??
    undefined;

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    if (tab === "overview") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ tab }, { replace: true });
    }
  };

  const renderPanel = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersPanel />;
      case "wishlist":
        return <WishlistPanel />;
      case "cart":
        return <CartPanel />;
      case "addresses":
        return <AddressesPanel />;
      case "settings":
        return <SettingsPanel user={currentUser} />;
      case "overview":
      default:
        return <OverviewPanel />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-6xl px-4 py-8 sm:px-6"
    >
      <ProfileHeader
        name={currentUser.name}
        email={currentUser.email}
        role={currentUser.role}
        memberSince={formatDate(currentUser.createdAt)}
        imageUrl={avatar}
        onEdit={() => handleTabChange("settings")}
      />

      {/* Tabs */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {TABS.map(({ key, label, Icon }) => {
          const active = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleTabChange(key)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-[#0B1F3A] text-white shadow"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {renderPanel()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
