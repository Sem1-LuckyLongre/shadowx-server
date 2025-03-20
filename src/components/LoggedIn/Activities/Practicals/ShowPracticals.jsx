import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PracticalCard from "./PracticalCard";
import { useTheme } from "../../../../context/ThemeContext";

const ShowPracticals = () => {
  const { isLoggedIn } = useTheme();
  const navigate = useNavigate();
  const [practicals, setPracticals] = useState([]);

  useEffect(() => {
    const Login = isLoggedIn;
    if (!Login) {
      navigate("/SignIn");
      return;
    }

    // Fetch saved practicals from localStorage
    const storedpracticals = localStorage.getItem("Practicals");
    if (storedpracticals) {
      setPracticals(JSON.parse(storedpracticals));
    }
  }, [navigate]);

  // ✅ Toggle Done/Undone Status
  const toggleStatus = (id) => {
    const updatedpracticals = practicals.map((assignment) =>
      assignment.id === id
        ? {
            ...assignment,
            status: assignment.status === "undone" ? "done" : "undone",
          }
        : assignment
    );

    setPracticals(updatedpracticals);
    localStorage.setItem("practicals", JSON.stringify(updatedpracticals));
  };

  // ❌ Delete Assignment
  const deletePracticals = (id) => {
    const updatedpracticals = practicals.filter(
      (assignment) => assignment.id !== id
    );

    setPracticals(updatedpracticals);
    localStorage.setItem("practicals", JSON.stringify(updatedpracticals));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-black p-6">
      {/* 🔥 Add New Assignment Button */}
      <motion.button
        className="mb-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out dark:bg-blue-500 dark:hover:bg-blue-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/addpracticals")}
      >
        ➕ Add New Practical
      </motion.button>

      <motion.h2
        className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Practicals
      </motion.h2>

      {practicals.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          No practicals added yet.
        </p>
      ) : (
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
          {practicals.map((practical) => (
            <PracticalCard
              key={practical.id}
              practical={practical}
              toggleStatus={toggleStatus}
              deletePractical={deletePracticals}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowPracticals;
