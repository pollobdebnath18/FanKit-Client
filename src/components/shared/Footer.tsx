import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import FanKitLogo from "../../assets/fankit-logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const linkHoverVariants = {
    initial: { x: 0, color: "#a0aec0" },
    hover: {
      x: 5,
      color: "#64b5f6",
      transition: { duration: 0.3 },
    },
  };

  const socialIconVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300 py-12 md:py-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
           <div className="flex justify-cnter items-center">
            <img src={FanKitLogo} alt="FanKit Logo" className="w-14 h-14" />
            <h3 className="text-2xl font-bold text-white ml-4">FanKit</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Elevate your fan experience with our premium collection of
              official merchandise and exclusive content.
            </p>
            <motion.div
              className="flex gap-4 pt-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { Icon: FaFacebook, href: "https://www.facebook.com" },
                { Icon: FaTwitter, href: "https://www.twitter.com" },
                { Icon: FaInstagram, href: "https://www.instagram.com" },
                { Icon: FaLinkedin, href: "https://www.linkedin.com" },
              ].map(({ Icon, href }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  variants={socialIconVariants}
                  initial="initial"
                  whileHover="hover"
                  className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-gray-300 hover:bg-blue-600 transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Products */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-2">
              {[
                "Apparel",
                "Accessories",
                "Limited Edition",
                "Collectibles",
                "Digital",
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={linkHoverVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <a href="#" className="text-sm font-medium">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Blog", "Careers", "Press", "Partners"].map(
                (item, idx) => (
                  <motion.li
                    key={idx}
                    variants={linkHoverVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    <a href="#" className="text-sm font-medium">
                      {item}
                    </a>
                  </motion.li>
                ),
              )}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get exclusive deals and updates.
            </p>
            <div className="space-y-2">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="w-full px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-slate-700 pt-8 mb-8"
        >
          <h4 className="text-lg font-semibold text-white mb-6">
            Get In Touch
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { Icon: MdEmail, title: "Email", value: "contact@fankit.com" },
              { Icon: MdPhone, title: "Phone", value: "++880 1780-589179" },
              {
                Icon: MdLocationOn,
                title: "Address",
                value: "32 Akhaliya, Sylhet, Bangladesh",
              },
            ].map(({ Icon, title, value }, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 5 }}
                className="flex items-start gap-3"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 15 }}
                  className="shrink-0 w-10 h-10 rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center text-blue-400"
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-sm text-gray-400">{value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-slate-700 pt-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} FanKit. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    variants={linkHoverVariants}
                    initial="initial"
                    whileHover="hover"
                    className="text-sm font-medium"
                  >
                    {item}
                  </motion.a>
                ),
              )}
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
          />
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
