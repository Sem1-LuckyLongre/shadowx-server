import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../../../common/Modal";
import { useTheme } from "../../../../context/ThemeContext";
import { toast } from "react-toastify";
const AddPracticals = () => {
  const { isLoggedIn } = useTheme();

  const navigate = useNavigate();
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    date: "",
    deadline: "",
    topic: "",
  });
  const [loading, setLoading] = useState(false);
  const [practicals, setPracticals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const Login = isLoggedIn;
    const storedSubjects = localStorage.getItem("SelectedSubjects");
    const storedPracticals = localStorage.getItem("Practicals");

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

      // Existing practicals fetch karo
      if (storedPracticals) {
        setPracticals(JSON.parse(storedPracticals));
      }
    } catch (error) {
      console.error("Error parsing data:", error);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.subject) {
      toast.error("Subject is required!");
      return;
    }
    if (formData.subject.length < 3 || formData.subject.length > 100) {
      toast.error("Subject must be between 3 and 100 characters!");
      return;
    }

    if (!formData.topic) {
      toast.error("Topic is required!");
      return;
    }
    if (formData.topic.length < 3 || formData.topic.length > 100) {
      toast.error("Topic must be between 3 and 100 characters!");
      return;
    }

    if (!formData.date) {
      toast.error("Date is required!");
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Time ko 00:00:00 kar diya

    const selectedDate = new Date(formData.date);
    selectedDate.setHours(0, 0, 0, 0); // Time ko 00:00:00 kar diya

    if (selectedDate < today) {
      toast.error("Date cannot be in the past!");
      return;
    }

    if (!formData.deadline) {
      toast.error("Deadline is required!");
      return;
    }
    if (new Date(formData.deadline) < new Date(formData.date)) {
      toast.error("Deadline must be after the selected date!");
      return;
    }
    if (
      new Date(formData.deadline) >
      new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    ) {
      toast.error("Deadline cannot be more than 1 year in the future!");
      return;
    }

    setLoading(true);

    // Function to calculate remaining days
    const calculateRemainingDays = (deadline) => {
      const today = new Date();
      const dueDate = new Date(deadline);
      const diffTime = dueDate - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    };

    const remainingDays = calculateRemainingDays(formData.deadline);

    // New assignment object with remaining days
    const newPractical = {
      id: Date.now(),
      subject: formData.subject,
      date: formData.date,
      deadline: formData.deadline,
      topic: formData.topic,
      status: "undone",
      remainingDays: remainingDays >= 0 ? remainingDays : 0, // Ensure no negative values
    };

    // Update practicals list
    const updatedpracticals = [...practicals, newPractical];
    setPracticals(updatedpracticals);

    // Save to localStorage
    localStorage.setItem("Practicals", JSON.stringify(updatedpracticals));

    setTimeout(() => {
      setLoading(false);
      toast.success("Practicals Added Successfully!");
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
        Add Practicals
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

        {/* Date of Assignment */}
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-white font-semibold mb-2">
            Date of Practical
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Deadline */}
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

        {/* Topic About Assignment */}
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-white font-semibold mb-2">
            Topic About Practical
          </label>
          <textarea
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your topic..."
          />
        </div>

        {/* Submit Button */}
        <motion.button
          className="w-full mt-4 bg-blue-600 text-white p-3 rounded-lg 
             hover:bg-blue-700 shadow-md transition duration-200 ease-in-out 
             dark:!bg-blue-500 dark:!hover:bg-blue-600 disabled:opacity-50"
          whileHover={!loading ? { scale: 1.05 } : {}}
          whileTap={!loading ? { scale: 0.95 } : {}}
          transition={{ duration: 0.5 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Practicals"}
        </motion.button>

        {/* 🔥 Show practicals Button (NEW) */}
        <NavLink to="/showPracticals">
          <motion.button
            className="w-full mt-4 bg-green-600 text-white p-3 rounded-lg 
          hover:bg-green-700 shadow-md transition duration-200 ease-in-out 
          dark:!bg-green-500 dark:!hover:bg-green-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            📜 Show Practicals
          </motion.button>
        </NavLink>
      </div>
      <NavLink to="/SelectSubs">
        <Modal
          isOpen={modalOpen}
          message="Please select your subjects first before adding Practical."
        />
      </NavLink>
    </div>
  );
};

export default AddPracticals;
