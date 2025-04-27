import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const MainLoader = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingMessages = [
    "Initializing systems...",
    "Loading modules...",
    "Preparing dashboard...",
    "Optimizing performance...",
    "Finalizing setup...",
    "Almost there..."
  ];

  const TOTAL_DURATION = 50; // 50 seconds total
  const MESSAGE_INTERVAL = TOTAL_DURATION / loadingMessages.length; // Seconds per message

  useEffect(() => {
    // Update message every MESSAGE_INTERVAL seconds
    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prev) => 
        (prev + 1) % loadingMessages.length
      );
    }, MESSAGE_INTERVAL * 1000);

    // Smooth progress over 50 seconds (0% → 99%)
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const newProgress = Math.min(99, (elapsed / TOTAL_DURATION) * 99); // Cap at 99%
      setProgress(newProgress);
    }, 100); // Update every 100ms for smoothness

    return () => {
      clearInterval(messageTimer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
      {/* Animation Container */}
      <div className="relative h-64 w-64">
        {/* Pulsing Core (Slowed to match 50s duration) */}
        <motion.div
          className="absolute inset-0 m-auto h-20 w-20 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3, // Slower pulse
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Rotating Rings (Adjusted for 50s) */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 m-auto rounded-full border border-emerald-400/20"
            style={{
              width: `${120 + i * 80}px`,
              height: `${120 + i * 80}px`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20 + i * 10, // Slower rotation
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-3 w-3 rounded-full bg-cyan-400 blur-[1px]"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: 80 * Math.cos((i * Math.PI) / 3),
              y: 80 * Math.sin((i * Math.PI) / 3),
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Text & Progress Bar */}
      <div className="mt-32 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessageIndex}
            className="text-lg text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {loadingMessages[currentMessageIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Progress Bar (0% → 99%) */}
        <div className="mt-8 w-64">
          <div className="h-2 w-full rounded-full bg-gray-700">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: TOTAL_DURATION, ease: "linear" }}
            />
          </div>
          <motion.span className="mt-2 block text-sm text-gray-300">
            {Math.floor(progress)}% {/* No decimals, stops at 99% */}
          </motion.span>
        </div>
      </div>
    </div>
  );
};