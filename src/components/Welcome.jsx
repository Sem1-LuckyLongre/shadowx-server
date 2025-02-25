/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import { FaRocket, FaSignInAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export const Welcome = ({ Registration }) => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["ShadowX"],
      typeSpeed: 150,
      backSpeed: 50,
      loop: true,
      backDelay: 3000,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-blue-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-blue-100 dark:from-black dark:via-gray-900 dark:to-blue-900 opacity-70 pointer-events-none"></div>

      {/* Floating Particles */}
      {[...Array(50)].map((_, index) => (
        <motion.div
          key={index}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 0.7, 0],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="absolute w-2 h-2 bg-blue-600/70 dark:bg-blue-500/50 rounded-full"
        />
      ))}

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center max-w-2xl p-8 bg-white/80 dark:bg-gray-800/60 rounded-3xl shadow-2xl backdrop-blur-lg border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Welcome Text */}
        <div className="mb-10">
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-3xl md:text-5xl flex flex-col md:flex-row font-bold text-gray-900 dark:text-white">
              Welcome to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 ml-3">
                <span ref={el} />
              </span>
            </h1>

            <p className="text-gray-600 dark:text-gray-300 max-w-xl text-lg mt-4">
            I’m a Passionate Web Developer, Dedicated to Building Sleek, Efficient, and user-friendly Digital Experiences Using Modern Technologies.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link to={`/${Registration ? "SignIn" : "projects"}`} className="group">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                flex items-center space-x-3 
                px-8 py-4 
                bg-gradient-to-r from-blue-600 to-purple-700 
                text-white 
                rounded-full 
                shadow-2xl 
                hover:shadow-blue-500/50 
                transition-all 
                duration-300 
                group-hover:ring-4 
                group-hover:ring-blue-500/50
              "
            >
              {Registration ? (
                <>
                  <FaSignInAlt className="mr-2" />
                  Go to Login
                </>
              ) : (
                <>
                  See My Projects
                  <FaRocket className="ml-2" />
                </>
              )}
              <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all" />
            </motion.button>
          </Link>
        </div>

        {/* Additional Information */}
        <div className="mt-8 text-gray-500 dark:text-gray-400 text-sm">
          Secure • Innovative • Powerful
        </div>
      </motion.div>
    </div>
  );
};
