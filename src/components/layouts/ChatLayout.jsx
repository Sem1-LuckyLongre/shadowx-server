import { NavLink, Outlet } from "react-router-dom";
import { FiUser, FiUsers, FiMessageCircle, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export const ChatLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useTheme(); // just to keep theme context if needed

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { type: "spring", stiffness: 200, damping: 25 } },
    exit: { x: "-100%", transition: { duration: 0.2 } },
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex flex-col md:flex-row relative">
      {/* Sidebar Toggle Button */}
      <button
        className="md:hidden p-4 focus:outline-none z-30"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <FiMenu size={24} className="text-gray-800 dark:text-white" />
      </button>

      {/* Sidebar + Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black dark:bg-black z-20 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            {/* Sidebar */}
            <motion.aside
              key="sidebar"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sidebarVariants}
              className="fixed top-0 left-0 h-full w-72 p-6 shadow-xl flex flex-col backdrop-blur-md rounded-r-3xl bg-white dark:bg-gray-800 z-30"
            >
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
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 p-6 shadow-xl flex-col backdrop-blur-md rounded-r-3xl bg-white dark:bg-gray-800">
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
              <li className="p-3 flex items-center gap-3 hover:bg-blue-500/20 dark:hover:bg-blue-600/30 cursor-pointer rounded-lg transition-all duration-300">
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
              <li className="p-3 flex items-center gap-3 hover:bg-blue-500/20 dark:hover:bg-blue-600/30 cursor-pointer rounded-lg transition-all duration-300">
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
              <li className="p-3 flex items-center gap-3 hover:bg-blue-500/20 dark:hover:bg-blue-600/30 cursor-pointer rounded-lg transition-all duration-300">
                <FiUsers size={20} className="text-blue-600 dark:text-blue-400" />
                To Group
              </li>
            </NavLink>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-2 md:p-8 flex flex-col">
        <motion.main
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="rounded-2xl shadow-xl p-2 md:p-6 bg-white dark:bg-gray-800 flex-1 flex flex-col"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};