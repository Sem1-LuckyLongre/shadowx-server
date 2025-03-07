// src/components/ModernLoader.js
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #1a1a1a, #2c3e50)",
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* Logo with Horizontal Circular Rotation */}
            <motion.div
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#fff",
                display: "flex",
                gap: "10px",
                perspective: "500px", // Adds a 3D perspective
              }}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {"Loading...".split("").map((char, index) => (
                <motion.span
                  key={index}
                  style={{
                    display: "inline-block",
                    transformOrigin: "center center", // Rotate from the center
                  }}
                  animate={{ rotateY: [0, 360] }} // Horizontal rotation
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.1,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              style={{
                width: "200px",
                height: "5px",
                backgroundColor: "#444",
                borderRadius: "5px",
                overflow: "hidden",
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
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
