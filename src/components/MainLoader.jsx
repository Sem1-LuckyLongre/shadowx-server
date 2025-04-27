import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const MainLoader = () => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");

  const loadingPhases = [
    { threshold: 0, message: "Initializing MongoDB connection..." },
    { threshold: 15, message: "Establishing API routes..." },
    { threshold: 30, message: "Loading React components..." },
    { threshold: 45, message: "Authenticating session..." },
    { threshold: 60, message: "Fetching dashboard data..." },
    { threshold: 75, message: "Applying theme preferences..." },
    { threshold: 90, message: "Finalizing your dashboard..." }
  ];

  useEffect(() => {
    const startTime = Date.now();
    
    const updateLoader = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const newProgress = Math.min(99, (elapsed / 50) * 99); // 50s duration
      setProgress(newProgress);

      // Update message based on progress
      const currentPhase = [...loadingPhases].reverse().find(
        phase => newProgress >= phase.threshold
      );
      setCurrentMessage(currentPhase?.message || "");

      if (newProgress < 99) {
        requestAnimationFrame(updateLoader);
      }
    };

    requestAnimationFrame(updateLoader);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900/95 backdrop-blur-sm">
      {/* Animated Core */}
      <div className="relative mb-12 h-40 w-40">
        {/* Pulsing Center */}
        <motion.div
          className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Rotating Nodes */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400"
            style={{
              x: 60 * Math.cos((i * 2 * Math.PI) / 3),
              y: 60 * Math.sin((i * 2 * Math.PI) / 3)
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Loading Message */}
      <motion.p 
        className="mb-8 text-lg font-light text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentMessage}
      </motion.p>

      {/* Precision Progress Bar */}
      <div className="w-full max-w-md px-6">
        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-800">
          {/* Glow Track */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10" />

          {/* Accurate Fill */}
          <motion.div
            className="relative h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{
              width: `${progress}%`,
              backgroundSize: "200% 100%",
              boxShadow: "inset 0 0 8px rgba(255,255,255,0.3)"
            }}
          >
            {/* Scanning Indicator */}
            <motion.div
              className="absolute right-0 top-1/2 h-4 w-0.5 -translate-y-1/2 bg-white/80"
              animate={{
                opacity: [0, 1, 0],
                x: ["-100%", "0%"]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>

        {/* Percentage Display */}
        <div className="mt-3 flex justify-between font-mono text-xs">
          <span className="text-gray-400">SYSTEM LOAD</span>
          <span className="text-cyan-300">
            {progress.toFixed(1)}% {/* 1 decimal precision */}
          </span>
        </div>
      </div>
    </div>
  );
};