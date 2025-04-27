import {
  FaEye,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaHeart,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = ({ totalVisits }) => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-center py-8 mt-auto border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          {/* Visit Counter */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 mb-4 group"
          >
            <FaEye className="text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 text-xl" />
            <p className="text-gray-700 dark:text-gray-300 font-medium text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              Total Visits:
              <span className="ml-2 inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-semibold">
                <motion.span
                  key={totalVisits}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  {totalVisits && totalVisits > 0
                    ? totalVisits + 1
                    : "Loading..."}
                </motion.span>
              </span>
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex space-x-5 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.a
              href="https://github.com/Sem1-LuckyLongre"
              whileHover={{ y: -2 }}
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 text-xl"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/shadowx_lucky_longre"
              whileHover={{ y: -2 }}
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 text-xl"
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 text-xl"
            >
              <FaTwitter />
            </motion.a>
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="text-gray-500 text-sm mt-5 dark:text-gray-400 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Made with <FaHeart className="text-red-500 mx-1" /> ©{" "}
            {new Date().getFullYear()} ShadowX
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
