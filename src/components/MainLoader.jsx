import { motion, AnimatePresence } from "framer-motion";

export const MainLoader = () => {
  const loadingMessages = [
    "Preparing your dashboard...",
    "Loading components...",
    "Optimizing performance...",
    "Almost there...",
  ];

  return (
    <div className="w-full z-50">
      <AnimatePresence>
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #0f0f0f, #1a1a2e)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            overflow: "hidden",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Abstract floating elements */}
          <motion.div
            style={{
              position: "absolute",
              top: "20%",
              left: "15%",
              width: "120px",
              height: "120px",
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              background: "linear-gradient(45deg, #00ff88, #00d4ff)",
              opacity: 0.1,
              filter: "blur(30px)",
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 180, 360],
              borderRadius: [
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "30% 70% 70% 30% / 30% 30% 70% 70%",
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            style={{
              position: "absolute",
              bottom: "25%",
              right: "20%",
              width: "150px",
              height: "150px",
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              background: "linear-gradient(135deg, #ff00aa, #8800ff)",
              opacity: 0.1,
              filter: "blur(40px)",
            }}
            animate={{
              y: [0, 60, 0],
              rotate: [0, -180, -360],
              borderRadius: [
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "60% 40% 30% 70% / 60% 30% 70% 40%",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Main loader animation */}
          <div
            style={{ position: "relative", width: "200px", height: "200px" }}
          >
            {/* Pulsing center circle */}
            <motion.div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00ff88, #00d4ff)",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 30px rgba(0, 255, 136, 0.5)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Rotating rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: `${120 + i * 60}px`,
                  height: `${120 + i * 60}px`,
                  border: `2px solid rgba(0, 255, 136, ${0.3 - i * 0.1})`,
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 8 + i * 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: `hsl(${i * 45}, 80%, 60%)`,
                  transform: "translate(-50%, -50%)",
                  filter: "blur(1px)",
                }}
                animate={{
                  x: 80 * Math.cos((i * Math.PI) / 4),
                  y: 80 * Math.sin((i * Math.PI) / 4),
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Loading text */}
          <motion.div
            style={{
              marginTop: "80px",
              fontSize: "18px",
              fontWeight: "500",
              color: "#fff",
              textAlign: "center",
              height: "30px",
            }}
          >
            <AnimatePresence mode="wait">
              {loadingMessages.map((message, index) => (
                <motion.div
                  key={index}
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {message}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Animated progress track */}
          <motion.div
            style={{
              width: "min(80%, 400px)",
              height: "6px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "40px",
              position: "relative",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.5), transparent)",
                borderRadius: "10px",
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "20%",
                height: "100%",
                background: "linear-gradient(90deg, #00ff88, #00d4ff)",
                borderRadius: "10px",
                boxShadow: "0 0 15px rgba(0, 255, 136, 0.7)",
              }}
              initial={{ x: "-20%" }}
              animate={{ x: "120%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </motion.div>

          {/* Percentage counter with animation */}
          <motion.div
            style={{
              marginTop: "20px",
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.7)",
              display: "flex",
              alignItems: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.span
              style={{
                display: "inline-block",
                width: "40px",
                textAlign: "right",
              }}
              animate={{
                scale: [1, 1.1, 1],
                color: [
                  "rgba(255,255,255,0.7)",
                  "#00ff88",
                  "rgba(255,255,255,0.7)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {0}
            </motion.span>
            %
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
