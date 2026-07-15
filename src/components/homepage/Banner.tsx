// import BannerImg from "../../assets/banner.png";
// const Banner = () => {
//   return (
//     <div>
//       {/* adding img */}
//       <img src={BannerImg} alt="Banner" className="w-full h-full" />
//     </div>
//   );
// };

// export default Banner;

import { motion } from "framer-motion";
import BannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="overflow-hidden">
      <motion.img
        src={BannerImg}
        alt="Banner"
        className="h-full w-full"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
};

export default Banner;
