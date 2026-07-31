import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import BannerImg from "../../assets/banner.png";
import BannerImg2 from "../../assets/banner2.jpg";
import BannerImg3 from "../../assets/banner3.webp";

const slides = [
  {
    id: 1,
    src: BannerImg,
    alt: "Banner 1",
    badge: "FIFA World Cup 2026",
    title: "Support Your Team in Style",
    subtitle: "Official jerseys, kits & fanwear — all in one place.",
    tagline: "Get your favourite team jersey at FanKit",
    cta: "Shop Now",
    discount: "Cut of 50% Discount",
    href: "/collections/football",
  },
  {
    id: 2,
    src: BannerImg2,
    alt: "Banner 2",
    badge: "New Season Collection",
    title: "Gear Up for Match Day",
    subtitle: "Fresh arrivals for the biggest tournaments of the year.",
    tagline: "Fresh kits from the top clubs & national teams",
    cta: "Shop Now",
    discount: "Cut of 30% Discount",
    href: "/collections/new-arrivals",
  },
  {
    id: 3,
    src: BannerImg3,
    alt: "Banner 3",
    position: "object-top",
    badge: "Limited Edition",
    title: "Iconic Kits, Authentic Fans",
    subtitle: "Get the jersey every fan is talking about.",
    tagline: "Official fan merchandise, delivered to your door",
    cta: "Shop Now",
    discount: "Cut of 25% Discount",
    href: "/collections/best-sellers",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div>
      {/* Image Slider */}
      <div className="relative overflow-hidden aspect-[8/3] w-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.id}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-cover ${slide.position ?? "object-center"}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2">
          {slides.map((s, index) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === current ? "w-6 bg-[#F5A623]" : "w-2.5 bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Section (outside image) */}
      <div className="bg-gray-300  px-6 py-3 text-black md:px-12 md:py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${slide.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-between gap-3"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="text-lg font-bold tracking-wide md:text-2xl">
                {slide.badge}
              </span>
              <span className="text-sm text-gray-600 md:text-base">
                {slide.tagline}
              </span>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <span className="text-sm font-semibold text-[#1D4ED8] md:text-base">
                {slide.discount}
              </span>
              <Link
                to={slide.href}
                className="inline-block rounded-lg bg-white px-5 py-2 text-sm font-semibold text-[#F5A623] transition-all hover:bg-gray-100 hover:shadow-lg"
              >
                {slide.cta} →
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Banner;
