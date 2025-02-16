import { motion } from "framer-motion";
export const Loader = () => {
  return (
    <div className="relative inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
      <motion.div
        className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
    </div>
  );
};
