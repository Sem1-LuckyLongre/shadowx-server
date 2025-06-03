import { NavLink, Outlet } from "react-router-dom";
import { FiUser, FiUsers, FiMessageCircle, FiMenu, FiX, FiLogOut, FiSettings } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";

export const ChatLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePath, setActivePath] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 768 });
  useTheme();

  // Close sidebar when route changes
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [activePath, isMobile, isSidebarOpen]);

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { 
      x: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        mass: 0.5
      } 
    },
    exit: { 
      x: "-100%", 
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      } 
    },
  };

  const navItems = [
    { 
      path: "/chat/admin", 
      name: "Admin Chat", 
      icon: <FiUser size={20} />,
      description: "Connect with support team"
    },
    { 
      path: "/chat/one-to-one", 
      name: "Direct Messages", 
      icon: <FiMessageCircle size={20} />,
      description: "Private conversations"
    },
    { 
      path: "/chat/group", 
      name: "Group Chats", 
      icon: <FiUsers size={20} />,
      description: "Collaborate with teams"
    }
  ];

  const renderNavItem = (item, isMobile = false) => (
    <NavLink
      key={item.path}
      to={item.path}
      className={({ isActive }) =>
        `group ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"}`
      }
      onClick={() => setActivePath(item.path)}
    >
      <motion.li
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={isMobile ? () => setIsSidebarOpen(false) : undefined}
        className="p-3 flex items-center gap-3 hover:bg-blue-500/10 dark:hover:bg-blue-600/20 cursor-pointer rounded-lg transition-all duration-200 mb-2"
      >
        <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
          {item.icon}
        </span>
        <div className="flex-1">
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
            {item.description}
          </p>
        </div>
        <motion.div
          layoutId="activeIndicator"
          animate={{ opacity: activePath === item.path ? 1 : 0 }}
          className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"
        />
      </motion.li>
    </NavLink>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Sidebar Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="md:hidden fixed top-4 left-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg z-30 focus:outline-none"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <FiMenu size={24} className="text-gray-800 dark:text-white" />
      </motion.button>

      {/* Mobile Sidebar with Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-20 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            
            <motion.aside
              key="sidebar"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sidebarVariants}
              className="fixed top-0 left-0 h-full w-72 p-6 shadow-2xl flex flex-col bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg z-30 border-r border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-8">
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
                >
                  Chat Hub
                </motion.h2>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <FiX size={24} className="text-gray-800 dark:text-white" />
                </motion.button>
              </div>

              <nav className="flex-1">
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {navItems.map(item => renderNavItem(item, true))}
                </motion.ul>
              </nav>

              <motion.div 
                className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button className="w-full p-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">
                  <FiSettings size={20} className="text-gray-600 dark:text-gray-400" />
                  <span>Settings</span>
                </button>
                <button className="w-full p-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all text-red-500">
                  <FiLogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden md:flex w-80 p-6 flex-col bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700"
      >
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Chat Hub
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Connect and collaborate
          </p>
        </motion.div>

        <nav className="flex-1">
          <ul className="space-y-1">
            {navItems.map(item => renderNavItem(item))}
          </ul>
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
          <button className="w-full p-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">
            <FiSettings size={20} className="text-gray-600 dark:text-gray-400" />
            <span>Settings</span>
          </button>
          <button className="w-full p-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all text-red-500">
            <FiLogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 flex flex-col">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="rounded-xl shadow-sm p-4 md:p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex-1 flex flex-col border border-gray-200 dark:border-gray-700"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};