import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Activities = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/80 dark:from-gray-900 dark:to-black min-h-screen p-5 text-center">
      <motion.h1 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
      >
        Activities
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <Link to="/addAssignments">
            <h2 className="text-xl font-semibold">📝 Add Assignments</h2>
          </Link>
        </motion.div>
        <motion.div 
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <Link to="/addPracticals">
            <h2 className="text-xl font-semibold">🧪 Add Practicals</h2>
          </Link>
        </motion.div>
        <motion.div 
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <Link to="/showAssignments">
            <h2 className="text-xl font-semibold">📝 Show Assignments</h2>
          </Link>
        </motion.div>
        <motion.div 
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <Link to="/showPracticals">
            <h2 className="text-xl font-semibold">🧪 Show Practicals</h2>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Activities;