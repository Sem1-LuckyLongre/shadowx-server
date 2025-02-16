import React from "react";
import { motion } from "framer-motion";
import AssignmentActions from "./AssignmentActions";

const AssignmentCard = ({ assignment, onToggleStatus, onDelete }) => {
  return (
    <motion.div
      className={`p-4 rounded-lg mb-4 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between ${
        assignment.status === "done"
          ? "bg-green-100 dark:bg-green-800"
          : "bg-gray-100 dark:bg-gray-700"
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {assignment.subject}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          📅 Date: {assignment.date}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          ⏳ Deadline: {assignment.deadline}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          ⏳ Remaining Days:
          <span
            className={
              assignment.remainingDays < 0
                ? "text-red-500 font-semibold"
                : ""
            }
          >
            {assignment.remainingDays < 0
              ? `Overdue by ${Math.abs(assignment.remainingDays)} days`
              : `${assignment.remainingDays} days left`}
          </span>
        </p>
        <p className="text-gray-800 dark:text-gray-200 mt-2">
          {assignment.topic}
        </p>
      </div>

      <AssignmentActions
        assignment={assignment}
        onToggleStatus={onToggleStatus}
        onDelete={onDelete}
      />
    </motion.div>
  );
};

export default AssignmentCard;
