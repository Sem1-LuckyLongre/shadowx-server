import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const MainLoader = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingMessages = [
    "Preparing your dashboard...",
    "Loading components...",
    "Optimizing performance...",
    "Almost there...",
  ];

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 10;
      });
    }, 500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Main animation container */}
        <div className="relative h-48 w-48 md:h-64 md:w-64">
          {/* Pulsing center circle */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-lg shadow-emerald-400/30"
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
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/20"
              style={{
                width: `${120 + i * 60}px`,
                height: `${120 + i * 60}px`,
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
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[1px]"
              style={{
                backgroundColor: `hsl(${i * 60}, 80%, 60%)`,
              }}
              animate={{
                x: 70 * Math.cos((i * Math.PI) / 3),
                y: 70 * Math.sin((i * Math.PI) / 3),
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

        {/* Loading text - now properly spaced */}
        <div className="mt-12 h-8 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessageIndex}
              className="text-lg font-medium text-white"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {loadingMessages[currentMessageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar container */}
        <div className="mt-8 w-full max-w-xs">
          {/* Background track */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700/50">
            {/* Animated progress */}
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Percentage indicator */}
          <motion.div
            className="mt-2 flex justify-center text-sm text-gray-300"
            animate={{
              color: progress >= 100 ? "#34d399" : "#d1d5db",
            }}
          >
            {Math.min(100, Math.round(progress))}%
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
