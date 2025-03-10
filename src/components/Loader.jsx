import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";

const icons = [FaGithub, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase];

export const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="w-full z-50">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #0f0f0f, #1e3c72)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              style={{
                position: "relative",
                width: "200px",
                height: "200px",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              {/* Icons Rotating in a Circle */}
              {icons.map((Icon, index) => (
                <motion.div
                  key={index}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "50px",
                    height: "50px",
                    margin: "-25px", // Center icons
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 80 * Math.cos((index * (2 * Math.PI)) / icons.length),
                    y: 80 * Math.sin((index * (2 * Math.PI)) / icons.length),
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                >
                  <Icon size={40} color="#00ff88" />
                </motion.div>
              ))}
            </motion.div>

            {/* Animated Loading Bar */}
            <motion.div
              style={{
                width: "250px",
                height: "8px",
                backgroundColor: "#222",
                borderRadius: "5px",
                overflow: "hidden",
                boxShadow: "0px 0px 10px #00ff88",
                position: "absolute",
                bottom: "-50px",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <motion.div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#00ff88",
                  borderRadius: "5px",
                  boxShadow: "0px 0px 15px #00ff88",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};