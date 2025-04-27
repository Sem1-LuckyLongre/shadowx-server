import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const MainLoader = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingMessages = [
    "Booting neural engine...",
    "Calibrating data streams...",
    "Optimizing quantum cache...",
    "Synthesizing AI models...",
    "Finalizing hyperparameters...",
    "Ready in T-minus 3.2..."
  ];

  const TOTAL_DURATION = 50; // 50 seconds
  const MESSAGE_INTERVAL = TOTAL_DURATION / loadingMessages.length;

  useEffect(() => {
    // Message cycler
    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, MESSAGE_INTERVAL * 1000);

    // Progress updater (0 → 99% in 50s)
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const newProgress = Math.min(99, (elapsed / TOTAL_DURATION) * 99);
      setProgress(newProgress);
    }, 50); // Smoother updates

    return () => {
      clearInterval(messageTimer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0e17]">
      {/* Core Hologram */}
      <div className="relative h-80 w-80">
        {/* Pulsing AI Core */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg,var(--tw-gradient-stops))] from-cyan-300 via-purple-500 to-cyan-300 shadow-[0_0_40px_10px_rgba(96,165,250,0.3)]"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Binary Ring (Floating 0/1) */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-mono text-cyan-300/80"
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {Array.from({ length: 36 }).map((_, i) => (
            <span
              key={i}
              className="absolute"
              style={{
                left: `${50 + 45 * Math.cos((i * Math.PI) / 18)}%`,
                top: `${50 + 45 * Math.sin((i * Math.PI) / 18)}%`,
                opacity: Math.random() > 0.5 ? 1 : 0.3
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </span>
          ))}
        </motion.div>

        {/* Grid Pulse Effect */}
        <motion.div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEyNSwyMTIsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity
          }}
        />
      </div>

      {/* Modern Progress Strip */}
      <div className="absolute bottom-20 w-full max-w-2xl px-10">
        {/* Progress Track */}
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-800/80 backdrop-blur-sm">
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-cyan-400/10"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          />

          {/* Animated Fill */}
          <motion.div
            className="relative h-full rounded-full bg-[length:200%_100%] bg-[linear-gradient(90deg,rgba(96,165,250,0.8)_0%,rgba(192,132,252,0.8)_50%,rgba(96,165,250,0.8)_100%)] shadow-[inset_0_0_10px_rgba(167,139,250,0.6),0_0_20px_rgba(96,165,250,0.3)]"
            initial={{ width: "0%" }}
            animate={{ 
              width: `${progress}%`,
              backgroundPosition: ["0% 0%", "100% 0%"] 
            }}
            transition={{ 
              width: { duration: TOTAL_DURATION, ease: "linear" },
              backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
            }}
          >
            {/* Scanning Light */}
            <motion.div
              className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/30 shadow-[0_0_15px_5px_rgba(96,165,250,0.7)]"
              animate={{
                x: "-100%",
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>

        {/* HUD-style Percentage */}
        <div className="mt-3 flex justify-between font-mono text-xs text-gray-400">
          <span>SYSTEM INIT</span>
          <motion.span 
            className="text-cyan-300"
            animate={{
              textShadow: "0 0 8px rgba(96,165,250,0.7)"
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {Math.floor(progress)}.{(progress % 1).toFixed(1).split('.')[1]}%
          </motion.span>
        </div>
      </div>

      {/* Animated Messages */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessageIndex}
          className="absolute top-1/3 w-full text-center"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg font-light text-cyan-100/90">
            {loadingMessages[currentMessageIndex]}
          </p>
          <motion.div
            className="mx-auto mt-2 h-[1px] w-32 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"
            animate={{
              scaleX: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};