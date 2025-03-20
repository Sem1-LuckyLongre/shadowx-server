import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import AssignmentCard from "./AssignmentCard";
import { useTheme } from "../../../../context/ThemeContext";

const ShowAssignments = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const { isLoggedIn } = useTheme();

  useEffect(() => {
    const Login = isLoggedIn;
    if (!Login) {
      navigate("/SignIn");
      return;
    }

    // Fetch saved assignments from localStorage
    const storedAssignments = localStorage.getItem("Assignments");
    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments));
    }
  }, [navigate]);

  const toggleStatus = (id) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id
        ? {
            ...assignment,
            status: assignment.status === "undone" ? "done" : "undone",
          }
        : assignment
    );

    setAssignments(updatedAssignments);
    localStorage.setItem("Assignments", JSON.stringify(updatedAssignments));
  };

  const deleteAssignment = (id) => {
    const updatedAssignments = assignments.filter(
      (assignment) => assignment.id !== id
    );

    setAssignments(updatedAssignments);
    localStorage.setItem("Assignments", JSON.stringify(updatedAssignments));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-black p-6">
      <NavLink to="/addAssignments">
        <motion.button
          className="mb-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out dark:bg-blue-500 dark:hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ➕ Add New Assignment
        </motion.button>
      </NavLink>
      <motion.h2
        className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Show Assignments
      </motion.h2>

      {assignments.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          No assignments added yet.
        </p>
      ) : (
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onToggleStatus={toggleStatus}
              onDelete={deleteAssignment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowAssignments;
