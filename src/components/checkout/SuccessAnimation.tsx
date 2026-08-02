import { motion } from "framer-motion";

const SuccessAnimation = ({ size = 96 }: { size?: number }) => {
  return (
    <motion.div
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1.15 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
        className="absolute inset-0 rounded-full bg-emerald-100"
      />
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 220, damping: 14 }}
        className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-300"
      >
        <motion.svg
          viewBox="0 0 52 52"
          style={{ width: size * 0.5, height: size * 0.5 }}
          initial="hidden"
          animate="visible"
        >
          <motion.path
            d="M14 27l8 8 16-16"
            fill="none"
            stroke="white"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { delay: 0.45, duration: 0.4, ease: "easeOut" },
              },
            }}
          />
        </motion.svg>
      </motion.span>
    </motion.div>
  );
};

export default SuccessAnimation;
