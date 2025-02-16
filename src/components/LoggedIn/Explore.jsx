import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../common/Modal'; // Importing the Modal component
import { motion } from 'framer-motion';

const Explore = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State for modal message

  const handleButtonClick = () => {
    setModalMessage("📩 Need Help? Contact the Developer!"); // Set the message for the modal
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/80 dark:from-gray-900 dark:to-black min-h-screen p-5 text-center">
      <motion.h1 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        Explore Activities
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          className="bg-green-500 text-white py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <Link to="/activities">
          <span>🔓</span>
            <h2 className="text-xl font-semibold">Activities</h2>
          </Link>
        </motion.div>
        <motion.div 
          className="bg-red-600 text-white py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl relative"
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <Link onClick={handleButtonClick}>
            <span role="img" aria-label="lock">🔒</span> 
            <h2 className="text-xl font-semibold">Generate Your Time Table</h2>
            <div className="absolute inset-0 bg-white opacity-30 rounded"></div>
          </Link>
        </motion.div>
        <motion.div 
          className="bg-red-600 text-white py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl relative"
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <Link onClick={handleButtonClick}> {/* Updated button to open modal */}
            <span role="img" aria-label="lock">🔒</span> 
            <h2 className="text-xl font-semibold">Buy DTC Ticket</h2>
            <div className="absolute inset-0 bg-white opacity-30 rounded"></div>
          </Link>
        </motion.div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={modalMessage} /> {/* Modal integration */}
    </div>
  );
};

export default Explore;
