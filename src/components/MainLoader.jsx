import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const ExtendedLoader = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingMessages = [
    "Initializing system...",
    "Loading core modules...",
    "Preparing your dashboard...",
    "Optimizing performance...",
    "Finalizing setup...",
    "Almost there...",
    "Just a few more seconds...",
    "Completing the process..."
  ];

  const TOTAL_DURATION = 50; // 50 seconds total

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, TOTAL_DURATION * 1000 / loadingMessages.length);

    // Smooth progress over TOTAL_DURATION
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const newProgress = Math.min(100, (elapsed / TOTAL_DURATION) * 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(progressInterval);
      }
    }, 100);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Main animation container - enlarged for video */}
      <div className="relative h-64 w-64 md:h-80 md:w-80">
        {/* Enhanced pulsing center */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-xl shadow-emerald-400/40"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* More pronounced rotating rings */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: `${140 + i * 80}px`,
              height: `${140 + i * 80}px`,
              borderColor: `hsla(${i * 90}, 80%, 60%, ${0.3 - i * 0.07})`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12 + i * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Enhanced floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[1px]"
            style={{
              backgroundColor: `hsl(${i * 45}, 80%, 60%)`,
            }}
            animate={{
              x: 90 * Math.cos((i * Math.PI) / 4),
              y: 90 * Math.sin((i * Math.PI) / 4),
              scale: [1, 1.8, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 4 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <div className="mt-16 h-10 text-center">
        <motion.p
          className="text-xl font-medium text-white"
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {loadingMessages[currentMessageIndex]}
        </motion.p>
      </div>

      {/* Progress bar */}
      <div className="mt-10 w-full max-w-md">
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-700/50">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: TOTAL_DURATION, ease: "linear" }}
          />
        </div>
        
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-gray-300">Loading</span>
          <motion.span 
            className="font-mono"
            animate={{
              color: progress >= 100 ? "#34d399" : "#d1d5db",
            }}
          >
            {Math.min(100, Math.round(progress))}%
          </motion.span>
        </div>
      </div>
    </div>
  );
};