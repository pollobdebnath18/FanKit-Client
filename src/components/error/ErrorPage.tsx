import { motion } from "framer-motion";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B1F3A] flex items-center justify-center px-6 py-16">
      {/* Pitch-stripe background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 2px, transparent 2px, transparent 120px)",
        }}
      />

      {/* Soft radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(224,164,33,0.12),transparent_55%)]" />

      {/* Center line (halfway line motif) */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.06]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] sm:h-40 sm:w-40" />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        {/* Offside flag — signature element, single restrained animation */}
        <motion.div
          initial={{ rotate: -8, opacity: 0, y: -10 }}
          animate={{ rotate: 0, opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-6"
        >
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="14"
              y1="66"
              x2="14"
              y2="10"
              stroke="#F5C542"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <motion.g
              initial={{ rotate: -25 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              style={{ transformOrigin: "14px 12px" }}
            >
              <path d="M14 10 L58 18 L14 26 Z" fill="#D6392E" />
            </motion.g>
          </svg>
        </motion.div>

        {/* Jersey-number style 404 */}
        <div className="relative mb-2">
          <span
            className="select-none text-[6.5rem] font-black leading-none tracking-tighter text-transparent sm:text-[9rem]"
            style={{
              WebkitTextStroke: "2px #E0A421",
            }}
          >
            404
          </span>
        </div>

        <h1 className="text-3xl font-black uppercase tracking-[0.15em] text-white sm:text-4xl">
          Offside
        </h1>

        <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300/80 sm:text-base">
          The referee's flag is up. This page doesn't exist, moved, or the play
          was called back before it ever got here.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-full bg-[#E0A421] px-8 py-3 text-sm font-bold uppercase tracking-wide text-[#0B1F3A] transition-colors hover:bg-[#F5C542]"
          >
            Back to Home
          </Link>
          <Link
            to="/jerseys"
            className="rounded-full border border-white/20 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white/40 hover:bg-white/5"
          >
            Browse Jerseys
          </Link>
        </div>

        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-slate-500">
          Error Code · 404
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
