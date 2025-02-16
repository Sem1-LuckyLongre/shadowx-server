import React from 'react';
import { motion } from 'framer-motion';
import PracticalActions from './PracticalActions';

const PracticalCard = ({ practical, toggleStatus, deletePractical }) => {
  return (
    <motion.div
      className={`p-4 rounded-lg mb-4 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between ${
        practical.status === "done"
          ? "bg-green-100 dark:bg-green-800"
          : "bg-gray-100 dark:bg-gray-700"
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {practical.subject}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          📅 Date: {practical.date}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          ⏳ Deadline: {practical.deadline}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          ⏳ Remaining Days:
          <span
            className={
              practical.remainingDays < 0
                ? "text-red-500 font-semibold"
                : ""
            }
          >
            {practical.remainingDays < 0
              ? `Overdue by ${Math.abs(practical.remainingDays)} days`
              : `${practical.remainingDays} days left`}
          </span>
        </p>
        <p className="text-gray-800 dark:text-gray-200 mt-2">
          {practical.topic}
        </p>
      </div>

      <PracticalActions 
        practical={practical}
        toggleStatus={toggleStatus}
        deletePractical={deletePractical}
      />
    </motion.div>
  );
};

export default PracticalCard;
