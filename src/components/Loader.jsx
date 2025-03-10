import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code, Terminal, Cpu, Server, Database, Bug } from "lucide-react";

const icons = [Code, Terminal, Cpu, Server, Database, Bug];

const MainLoader = ({ onFinish }) => {
  const radius = 80; // Radius of the circular path
  const [visibleIcons, setVisibleIcons] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < icons.length) {
        setVisibleIcons((prev) => [...prev, icons[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowWelcome(true), 1000); // Show welcome text after icons animation
      }
    }, 500);

    setTimeout(() => {
      onFinish();
    }, 5000);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 5, duration: 0.6 }}
    >
      <div className="relative w-[200px] h-[200px] flex items-center justify-center">
        {/* Central Glowing Circle */}
        <motion.div
          className="absolute w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-2xl shadow-cyan-400/50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* Rotating Icons */}
        {visibleIcons.map((Icon, index) => {
          const angle = (index / icons.length) * (2 * Math.PI);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, x, y, rotate: 360 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
              className="absolute text-blue-400 shadow-xl bg-white/10 p-3 rounded-full backdrop-blur-sm"
            >
              <Icon className="w-8 h-8 text-cyan-300" />
            </motion.div>
          );
        })}

        {/* Pulsating Ring */}
        <motion.div
          className="absolute w-[200px] h-[200px] border-2 border-cyan-400/50 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Welcome Text Animation */}
      {showWelcome && (
        <motion.div
          className="absolute bottom-10 text-2xl font-semibold text-cyan-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: -20, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          Welcome to ShadowX
        </motion.div>
      )}
    </motion.div>
  );
};

export default MainLoader;
