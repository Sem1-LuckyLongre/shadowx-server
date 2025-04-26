import { motion, AnimatePresence } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaChartLine,
  FaServer,
  FaPalette,
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs } from "react-icons/si";

const techIcons = [
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  SiTypescript,
  SiNextdotjs,
  FaChartLine,
  FaServer,
  FaPalette,
];

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
          {/* Floating background elements */}
          <motion.div
            style={{
              position: "absolute",
              top: "20%",
              left: "10%",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "rgba(0, 255, 136, 0.05)",
              filter: "blur(30px)",
            }}
            animate={{
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            style={{
              position: "absolute",
              bottom: "15%",
              right: "15%",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "rgba(0, 200, 255, 0.05)",
              filter: "blur(40px)",
            }}
            animate={{
              y: [0, 50, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Main loader content */}
          <div
            style={{ position: "relative", width: "300px", height: "300px" }}
          >
            {/* Outer rotating ring */}
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: "2px dashed rgba(0, 255, 136, 0.3)",
                borderRadius: "50%",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner rotating ring */}
            <motion.div
              style={{
                position: "absolute",
                top: "25%",
                left: "25%",
                right: "25%",
                bottom: "25%",
                border: "1px dashed rgba(0, 200, 255, 0.2)",
                borderRadius: "50%",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Icons Rotating in a Circle */}
            {techIcons.map((Icon, index) => (
              <motion.div
                key={index}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "50px",
                  height: "50px",
                  margin: "-25px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                animate={{
                  x: 120 * Math.cos((index * (2 * Math.PI)) / techIcons.length),
                  y: 120 * Math.sin((index * (2 * Math.PI)) / techIcons.length),
                  rotate: -360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.1,
                  }}
                >
                  <Icon
                    size={30}
                    color={`hsl(${index * (360 / techIcons.length)}, 80%, 60%)`}
                  />
                </motion.div>
              </motion.div>
            ))}

            {/* Central logo/text */}
            <motion.div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  background: "linear-gradient(90deg, #00ff88, #00d4ff)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  marginBottom: "10px",
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Dashboard
              </motion.div>
            </motion.div>
          </div>

          {/* Loading text */}
          <motion.div
            style={{
              marginTop: "60px",
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

          {/* Animated Loading Bar */}
          <motion.div
            style={{
              width: "min(80%, 400px)",
              height: "8px",
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
                  "linear-gradient(90deg, transparent, #00ff88, transparent)",
                borderRadius: "10px",
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "30%",
                height: "100%",
                background: "linear-gradient(90deg, #00ff88, #00d4ff)",
                borderRadius: "10px",
                boxShadow: "0 0 10px #00ff88",
              }}
              initial={{ x: "-30%", width: "30%" }}
              animate={{ x: "130%", width: "30%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
          </motion.div>

          {/* Percentage counter */}
          <motion.div
            style={{
              marginTop: "20px",
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.7)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
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
