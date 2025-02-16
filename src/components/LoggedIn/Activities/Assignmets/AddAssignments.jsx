import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../../../common/Modal";

const AddAssignment = () => {
  const navigate = useNavigate();
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    date: "",
    deadline: "",
    topic: "",
  });
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const Login = localStorage.getItem("LoggedIn");
    const storedSubjects = localStorage.getItem("SelectedSubjects");
    const storedAssignments = localStorage.getItem("Assignments");

    if (!Login) {
      navigate("/SignIn");
      return;
    } else if (!storedSubjects) {
      setModalOpen(true);
      return;
    }

    try {
      const parsedSubjects = JSON.parse(storedSubjects);
      const subjectList = Object.keys(parsedSubjects)
        .filter((key) => key !== "semester")
        .map((key) => parsedSubjects[key])
        .flat()
        .filter((subject) => subject !== "");

      setSelectedSubjects(subjectList);

      if (storedAssignments) {
        setAssignments(JSON.parse(storedAssignments));
      }
    } catch (error) {
      console.error("Error parsing data:", error);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      !formData.subject ||
      !formData.date ||
      !formData.deadline ||
      !formData.topic
    ) {
      alert("Please fill all the fields!");
      return;
    }

    setLoading(true);

    const calculateRemainingDays = (deadline) => {
      const today = new Date();
      const dueDate = new Date(deadline);
      const diffTime = dueDate - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const remainingDays = calculateRemainingDays(formData.deadline);

    const newAssignment = {
      id: Date.now(),
      subject: formData.subject,
      date: formData.date,
      deadline: formData.deadline,
      topic: formData.topic,
      status: "undone",
      remainingDays: remainingDays >= 0 ? remainingDays : 0,
    };

    const updatedAssignments = [...assignments, newAssignment];
    setAssignments(updatedAssignments);

    localStorage.setItem("Assignments", JSON.stringify(updatedAssignments));

    setTimeout(() => {
      setLoading(false);
      alert("Assignment Added Successfully!");
      setFormData({ subject: "", date: "", deadline: "", topic: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-black p-6">
      <motion.h2
        className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Add Assignment
      </motion.h2>

      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
        {/* Select Subject */}
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-white font-semibold mb-2">
            Select Subject
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              --- Select Subject ---
            </option>
            {selectedSubjects.length > 0 ? (
              selectedSubjects.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))
            ) : (
              <option disabled>No subjects available</option>
            )}
          </select>
        </div>

        {/* Date Field */}
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-white font-semibold mb-2">
            Date of Assignment
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Deadline Field */}
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-white font-semibold mb-2">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Topic Field */}
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-white font-semibold mb-2">
            Topic
          </label>
          <textarea
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter topic details..."
          />
        </div>

        {/* Submit Button */}
        <motion.button
          className="w-full mt-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 shadow-md transition duration-200 ease-in-out dark:!bg-blue-500 dark:!hover:bg-blue-600 disabled:opacity-50"
          whileHover={!loading ? { scale: 1.05 } : {}}
          whileTap={!loading ? { scale: 0.95 } : {}}
          transition={{ duration: 0.5 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Assignment"}
        </motion.button>

        {/* Show Assignments Button */}
        <NavLink to="/showAssignments">
          <motion.button
            className="w-full mt-4 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 shadow-md transition duration-200 ease-in-out dark:!bg-green-500 dark:!hover:bg-green-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            📜 Show Assignments
          </motion.button>
        </NavLink>
      </div>

      {/* Modal for Subject Selection Alert */}
      <NavLink to="/SelectSubs">
        <Modal
          isOpen={modalOpen}
          message="Please select your subjects first before adding assignments."
        />
      </NavLink>
    </div>
  );
};

export default AddAssignment;
