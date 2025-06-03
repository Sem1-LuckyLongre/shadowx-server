import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const ChatLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white dark:bg-gray-800 shadow-lg"
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Chat</h2>
        </div>
        <nav className="mt-4">
          <Link
            to="/admin"
            className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            To Admin
          </Link>
          <Link
            to="/one-to-one"
            className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            One to One
          </Link>
          <Link
            to="/group"
            className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            to Group
          </Link>
        </nav>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-8"
      >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Chat Content</h1>
        {/* Add your chat content here */}
      </motion.div>
    </div>
  );
};
