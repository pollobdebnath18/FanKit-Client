import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBolt,
  FaClock,
  FaFire,
  FaShieldAlt,
  FaTag,
  FaTruck,
  FaUndo,
} from "react-icons/fa";
import { useShopProducts } from "../../hooks/useShopProducts";
import type { ShopFilters, ShopResponse } from "../../api/shop.api";
import type { Product } from "../../api/product.api";
import JerseyCard from "../../components/products/JerseyCard";
import ProductCardSkeleton from "../../components/loader/ProductCardSkeleton";
import { usePageMeta } from "../../hooks/usePageMeta";

const QuickViewModal = lazy(
  () => import("../../components/products/QuickViewModal"),
);

const TIMEBOX_CLASSES =
  "flex flex-col items-center rounded-xl bg-white/10 px-3 py-2.5 md:px-4 md:py-3 backdrop-blur border border-white/10";

const getNextMidnight = () => {
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return midnight;
};

interface ProductSectionProps {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  linkHref: string;
  linkLabel: string;
  data?: ShopResponse;
  isLoading: boolean;
  isError: boolean;
  onQuickView: (product: Product) => void;
  count?: number;
}

const ProductSection = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  linkHref,
  linkLabel,
  data,
  isLoading,
  isError,
  onQuickView,
  count = 4,
}: ProductSectionProps) => {
  const products = data?.products ?? [];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">
              {eyebrow}
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
              {title}{" "}
              <span className="bg-gradient-to-r from-[#F5A623] to-orange-500 bg-clip-text text-transparent">
                {highlight}
              </span>
            </h2>
            <p className="mt-2 text-gray-600">{subtitle}</p>
          </div>
          <Link
            to={linkHref}
            className="inline-flex shrink-0 items-center gap-2 text-[#1D4ED8] font-semibold hover:text-[#2563EB] transition"
          >
            {linkLabel} <FaArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {Array.from({ length: count }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <p className="rounded-2xl border border-slate-100 bg-white py-16 text-center text-red-500">
            Failed to load products. Please refresh the page.
          </p>
        ) : products.length === 0 ? (
          <p className="rounded-2xl border border-slate-100 bg-white py-16 text-center text-slate-500">
            No products in this collection right now. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {products.map((product, index) => (
              <JerseyCard
                key={product._id}
                product={product}
                index={index}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const OffersPage = () => {
  usePageMeta({
    title: "FanKit - Offers",
    description:
      "Explore today's best deals, fresh arrivals, and best sellers at FanKit. Up to 50% off official jerseys and fan gear.",
    keywords: "FanKit offers, deals, discounts, jerseys on sale, new arrivals",
    image: "/favicon.svg",
  });
  const [quickView, setQuickView] = useState<Product | null>(null);

  const dealFilters: ShopFilters = {
    sport: "",
    onSale: true,
    sort: "newest",
    page: 1,
    limit: 8,
    minPrice: 0,
    maxPrice: Number.MAX_SAFE_INTEGER,
  };
  const newFilters: ShopFilters = {
    sport: "",
    newArrival: true,
    sort: "newest",
    page: 1,
    limit: 8,
    minPrice: 0,
    maxPrice: Number.MAX_SAFE_INTEGER,
  };
  const bestFilters: ShopFilters = {
    sport: "",
    sort: "best-selling",
    page: 1,
    limit: 4,
    minPrice: 0,
    maxPrice: Number.MAX_SAFE_INTEGER,
  };

  const deals = useShopProducts(dealFilters);
  const arrivals = useShopProducts(newFilters);
  const bestSellers = useShopProducts(bestFilters);

  // Countdown to the next midnight for the flash-sale banner.
  const [target, setTarget] = useState(getNextMidnight);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= target.getTime()) setTarget(getNextMidnight());
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const diff = Math.max(target.getTime() - now, 0);
  const hours = Math.floor(diff / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");

  const perks = [
    { Icon: FaTag, title: "Up to 50% Off", subtitle: "On fan favourite kits" },
    { Icon: FaTruck, title: "Free Shipping", subtitle: "On orders over ৳2000" },
    { Icon: FaUndo, title: "7-Day Returns", subtitle: "Easy & hassle free" },
    { Icon: FaShieldAlt, title: "100% Authentic", subtitle: "Official merchandise" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#06111f] via-[#0B1F3A] to-[#123a7a] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#F5A623]/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <p className="inline-flex items-center gap-2 rounded-full bg-[#F5A623]/15 px-4 py-1.5 text-sm font-bold text-[#F5A623]">
                <FaFire /> LIMITED TIME OFFERS
              </p>
              <h1 className="mt-6 text-4xl font-bold md:text-6xl">
                Unbeatable{" "}
                <span className="bg-gradient-to-r from-[#F5A623] to-orange-400 bg-clip-text text-transparent">
                  Fan Deals
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-lg text-blue-200">
                Score the hottest jerseys and fan gear at prices every supporter
                will love. Don't blink — these deals disappear fast.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/shop/all-products?onSale=true"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#e09518] px-7 py-3.5 font-bold text-[#0B1F3A] shadow-lg shadow-[#F5A623]/30 transition hover:from-[#e09518] hover:to-[#c87d10]"
                >
                  Shop Today's Deals <FaBolt />
                </Link>
                <Link
                  to="/shop/all-products"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-7 py-3.5 font-bold text-white transition hover:bg-white/10"
                >
                  Browse All Products
                </Link>
              </div>
            </motion.div>

            {/* Flash sale countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="shrink-0"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5A623]">
                  <FaClock /> Flash Sale ends in
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <div className={TIMEBOX_CLASSES}>
                    <span className="text-3xl font-bold md:text-4xl">
                      {pad(hours)}
                    </span>
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-blue-200">
                      Hours
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-[#F5A623]">:</span>
                  <div className={TIMEBOX_CLASSES}>
                    <span className="text-3xl font-bold md:text-4xl">
                      {pad(minutes)}
                    </span>
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-blue-200">
                      Mins
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-[#F5A623]">:</span>
                  <div className={TIMEBOX_CLASSES}>
                    <span className="text-3xl font-bold md:text-4xl">
                      {pad(seconds)}
                    </span>
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-blue-200">
                      Secs
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Perks strip */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:px-8">
          {perks.map(({ Icon, title, subtitle }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5A623]/15 text-[#F5A623]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{title}</p>
                <p className="text-xs text-slate-500">{subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Deal sections */}
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <ProductSection
          eyebrow="🔥 Hot right now"
          title="Today's"
          highlight="Deals"
          subtitle="The biggest discounts across every sport — while stock lasts."
          linkHref="/shop/all-products?onSale=true"
          linkLabel="View All Deals"
          data={deals.data}
          isLoading={deals.isLoading}
          isError={deals.isError}
          onQuickView={setQuickView}
        />
      </div>

      <ProductSection
        eyebrow="✨ Just dropped"
        title="Fresh"
        highlight="Arrivals"
        subtitle="The newest kits and fanwear to land on FanKit."
        linkHref="/shop/all-products?newArrival=true"
        linkLabel="View New Arrivals"
        data={arrivals.data}
        isLoading={arrivals.isLoading}
        isError={arrivals.isError}
        onQuickView={setQuickView}
        count={8}
      />

      <div className="bg-gradient-to-b from-white to-slate-50">
        <ProductSection
          eyebrow="🏆 Fan favourites"
          title="Best"
          highlight="Sellers"
          subtitle="The kits every supporter is adding to their cart right now."
          linkHref="/shop/all-products?sort=best-selling"
          linkLabel="View Best Sellers"
          data={bestSellers.data}
          isLoading={bestSellers.isLoading}
          isError={bestSellers.isError}
          onQuickView={setQuickView}
        />
      </div>

      {/* Bottom CTA */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#F5A623] to-[#e09518] px-8 py-14 text-center"
          >
            <div className="pointer-events-none absolute -top-10 right-10 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
            <h2 className="text-3xl font-bold text-[#0B1F3A] md:text-4xl">
              Don't Miss Out on the Biggest Savings
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-medium text-[#0B1F3A]/80">
              New deals drop every week. Grab your favourite team's kit before
              the price goes back up.
            </p>
            <Link
              to="/shop/all-products?onSale=true"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-8 py-3.5 font-bold text-white shadow-lg transition hover:bg-[#123a7a]"
            >
              View All Deals <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={null}>
        <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
      </Suspense>
    </motion.div>
  );
};

export default OffersPage;
