import { NavLink, Outlet } from "react-router-dom";
import { FiUser, FiUsers, FiMessageCircle, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
// import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export const ChatLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const { user } = useTheme();

  // Sidebar animation variants
  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { type: "spring", stiffness: 200, damping: 25 } },
    exit: { x: "-100%", transition: { duration: 0.2 } },
  };

  return (
    <div className="bg-gray-100 md:p-6 -z-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Toggle Button */}
      <button
        className="md:hidden p-4 focus:outline-none"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Open sidebar"
      >
        <FiMenu size={24} className="text-gray-800 dark:text-white" />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 768) && (
          <motion.aside
            key="sidebar"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            className={`w-72 p-6 shadow-xl flex flex-col backdrop-blur-md rounded-r-3xl bg-white dark:bg-gray-800 transition-transform transform md:translate-x-0 fixed md:relative z-20 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
          >
            {/* Close Button */}
            <button
              className="md:hidden absolute top-4 right-4 text-gray-800 dark:text-white"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <FiX size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Chat Panel
            </h2>
            <nav className="flex-1">
              <ul>
                <NavLink
                  to="/chat/admin"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 dark:text-blue-400" : ""
                  }
                >
                  <li
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-3 flex items-center gap-3 hover:bg-blue-500/20 dark:hover:bg-blue-600/30 cursor-pointer rounded-lg transition-all duration-300"
                  >
                    <FiUser size={20} className="text-blue-600 dark:text-blue-400" />
                    To Admin
                  </li>
                </NavLink>
                <NavLink
                  to="/chat/one-to-one"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 dark:text-blue-400" : ""
                  }
                >
                  <li
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-3 flex items-center gap-3 hover:bg-blue-500/20 dark:hover:bg-blue-600/30 cursor-pointer rounded-lg transition-all duration-300"
                  >
                    <FiMessageCircle size={20} className="text-blue-600 dark:text-blue-400" />
                    One to One
                  </li>
                </NavLink>
                <NavLink
                  to="/chat/group"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 dark:text-blue-400" : ""
                  }
                >
                  <li
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-3 flex items-center gap-3 hover:bg-blue-500/20 dark:hover:bg-blue-600/30 cursor-pointer rounded-lg transition-all duration-300"
                  >
                    <FiUsers size={20} className="text-blue-600 dark:text-blue-400" />
                    To Group
                  </li>
                </NavLink>
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <motion.main
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="rounded-2xl shadow-xl p-4 md:p-6 bg-white dark:bg-gray-800"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};