import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const teams = [
  {
    name: "Barcelona",
    href: "/shop/all-products?type=club-jerseys",
    logo: "https://i.ibb.co.com/99J8gsx0/images-q-tbn-ANd9-Gc-SBIw-Pm63wr-Wk7-RRfk-GA1o-024gx-Bps9-GL8r-At-Scknn-WAc0a-kq6ms5o-P0-s-10.jpg",
    sport: "Football",
  },
  {
    name: "Real Madrid",
    href: "/shop/football?type=club-jerseys",
    logo: "https://i.ibb.co.com/jPKSwMpy/images-q-tbn-ANd9-Gc-QQh-Q0p-RNj2-V5m-Tkc-CXl-Oin-Fq-SWv-P0-Yr9-JRZa-Vwf7f-Ehg-s-10.png",
    sport: "Football",
  },
  {
    name: "Liverpool",
    href: "/shop/football?type=club-jerseys",
    logo: "https://i.ibb.co.com/6Jq2GT0F/images-q-tbn-ANd9-Gc-R4ri9-PP5-T9es-XWRLlpm-YMDTYd-Jtm-I8c-Tb-TG-Db45-Hp4g-s-10.jpg",
    sport: "Football",
  },
  {
    name: "Bangladesh",
    href: "/shop/cricket?type=international-jerseys&gender=men",
    logo: "https://i.ibb.co.com/xqb6K8XV/1280px-Bangladesh-Cricket-Board-Logo-svg.png",
    sport: "Cricket",
  },
  {
    name: "RCB",
    href: "/shop/cricket?type=franchise-jerseys&gender=men",
    logo: "https://i.ibb.co.com/qYCd51TH/images-q-tbn-ANd9-Gc-Tsoer-L2e6-ERn-Ohy-Ofc4pykqrmni-Fbid-FZ1-SZy-Nit-KO-j0qk8t-Ue-DMB1-WQ-s-10.jpg",
    sport: "Cricket",
  },
  {
    name: "India",
    href: "/shop/cricket?type=international-jerseys&gender=men",
    logo: "https://i.ibb.co.com/JW3sdRmH/images-q-tbn-ANd9-Gc-Q-ugp-Fz-Bu-UTi4c7h-Bpl370-Kj-F-Ucr0-MAe-BWa-Wd-R-89i-Tm10-Bj-Yerskuc-H-s-10.jpg",
    sport: "Cricket",
  },
  {
    name: "Man United",
    href: "/shop/football?type=club-jerseys",
    logo: "https://i.ibb.co.com/x9WtXKV/250px-Manchester-United-FC-crest-svg.png",
    sport: "Football",
  },
  {
    name: "Australia",
    href: "/shop/cricket?type=international-jerseys&gender=men",
    logo: "https://i.ibb.co.com/DfgB0Fq2/cricket-australia-logo-e-2147483647-v-beta-t-XAW3w8zv-Wd-Jjcz-Ix-Qlq6-J42y-Xgm-Dy-Lk-Oh3tc-Gl-Apysg.jpg",
    sport: "Cricket",
  },
  {
    name: "South Africa",
    href: "/shop/cricket?type=international-jerseys&gender=men",
    logo: "https://i.ibb.co.com/ycFsHbMC/south.jpg",
    sport: "Cricket",
  },
  {
    name: "MI",
    href: "/shop/cricket?type=franchise-jerseys&gender=men",
    logo: "https://i.ibb.co.com/HLm5xspG/images-q-tbn-ANd9-Gc-TICZdpl-TXTd3j-FCl7da-BTo-LF5yw4-Ce-Rl-Yi-GZCiy7-Uisf-XHFBaf-Zn-L3lq4-s-10.png",
    sport: "Cricket",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const ShopByTeam = () => {
  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
            Shop By{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Team
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Rep your favorite club or country
          </p>
        </motion.div>

        {/* Team Grid - 5 per row, circular crest */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6 md:gap-y-14 md:gap-x-8"
        >
          {teams.map((team) => (
            <motion.div key={team.name} variants={cardVariants}>
              <Link
                to={team.href}
                className="group flex flex-col items-center text-center"
              >
                {/* Circular crest */}
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-40" />
                  <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-slate-50 ring-1 ring-slate-200 shadow-sm transition-all duration-300 group-hover:ring-2 group-hover:ring-blue-500 group-hover:shadow-xl group-hover:-translate-y-1.5">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Sport tag */}
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wide ring-1 ring-slate-200 shadow-sm">
                    {team.sport}
                  </span>
                </div>

                {/* Name */}
                <h3 className="mt-5 text-base md:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                  {team.name}
                </h3>
                <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-blue-600 opacity-0 -translate-y-0.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Shop Now
                  <FaArrowRight className="text-[9px]" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-14 text-center"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default ShopByTeam;
