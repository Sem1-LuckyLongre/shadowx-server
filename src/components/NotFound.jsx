import React from "react";
import { Link, useRouteError, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaExclamationTriangle,
  FaRobot,
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";

const NotFound = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.2, yoyo: Infinity },
    },
  };

  const textVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.3, duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-blue-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-300/30 dark:bg-blue-500/50 rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: Math.random() * 2 + 1,
              delay: Math.random() * 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * window.innerWidth}px`,
              top: `${Math.random() * window.innerHeight}px`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center max-w-xl p-8 bg-white/80 dark:bg-gray-800/60 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-200 dark:border-gray-700"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <div className="absolute bg-transparent top-4 left-4">
          <button
            onClick={handleGoBack}
            className="flex items-center bg-transparent space-x-2 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition group"
          >
            <FaArrowLeft className="bg-transparent group-hover:-translate-x-1 transition" />
            <span className="text-sm">Go Back</span>
          </button>
        </div>

        {/* Error Illustration */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <FaRobot className="text-8xl text-blue-600 dark:text-blue-400 animate-bounce" />
        </motion.div>

        {/* Error Details */}
        <motion.div className="space-y-4" variants={textVariants} initial="hidden" animate="visible">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {error.status || 404}
          </h1>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            {error.statusText || "Page Not Found"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {error.data ||
              "Oops! The page you're looking for seems to have wandered off into the digital wilderness."}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <motion.div variants={buttonVariants} whileHover="hover">
            <Link
              to="/"
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
            >
              <FaHome />
              <span>Return Home</span>
            </Link>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover">
            <Link
              to="/contact"
              className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <FaEnvelope />
              <span>Contact Support</span>
            </Link>
          </motion.div>
        </div>

        {/* Additional Error Information */}
        <div className="mt-8 flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
          <FaExclamationTriangle />
          <p className="text-sm">
            Error Code: {error.status || 404} | Timestamp:{" "}
            {new Date().toLocaleString()}
          </p>
        </div>
      </motion.div>
      {/* Decorative Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-900/20 opacity-50 pointer-events-none"></div>
    </div>
  );
};

export default NotFound;
