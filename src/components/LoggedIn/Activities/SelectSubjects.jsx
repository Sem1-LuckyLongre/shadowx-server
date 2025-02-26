import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "../../Loader";
import { NavLink, useNavigate } from "react-router-dom";
import semesterSubjects from "./SemesterSubjects.json"; // ✅ Importing subject data

const SubjectSelection = () => {
  const navigate = useNavigate();
  const [semester, setSemester] = useState("");
  const [subjectsData, setSubjectsData] = useState({});
  const [selectedSubjects, setSelectedSubjects] = useState({
    AEC: "",
    VAC: "",
    SEC: "",
    GE: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const Login = localStorage.getItem("LoggedIn");
    const storedSubjects = localStorage.getItem("SelectedSubjects");

    if (!Login) {
      navigate("/SignIn");
    } else if (storedSubjects) {
      navigate("/addAssignments");
      return;
    }
  }, []);

  const handleSemesterChange = (e) => {
    const selectedSemester = e.target.value;
    setSemester(selectedSemester);
    setSubjectsData(semesterSubjects[selectedSemester] || {});
    setSelectedSubjects({ AEC: "", VAC: "", SEC: "", GE: "" });
  };

  const handleSelectChange = (category, value) => {
    setSelectedSubjects((prev) => ({ ...prev, [category]: value }));
  };

  const validateSelection = () =>
    selectedSubjects.AEC && selectedSubjects.VAC && selectedSubjects.SEC && selectedSubjects.GE;

  const handleSubmit = () => {
    if (!validateSelection()) {
      setError("Please select a subject for AEC, VAC, SEC, and GE before submitting.");
      return;
    }

    setError("");
    setLoading(true);

    const allSelectedSubjects = {
      DSC: subjectsData.DSC || [],
      AEC: selectedSubjects.AEC,
      VAC: selectedSubjects.VAC,
      SEC: selectedSubjects.SEC,
      GE: selectedSubjects.GE,
    };

    setTimeout(() => {
      localStorage.setItem("SelectedSubjects", JSON.stringify(allSelectedSubjects));
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-black p-4 sm:p-6 w-full">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-70 z-50">
          <Loader />
        </div>
      )}

      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Select Your Semester and Subjects
      </motion.h2>

      {!submitted ? (
        <>
          <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Select Semester
            </h3>
            <select
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              value={semester}
              onChange={handleSemesterChange}
            >
              <option value="" disabled>
                ---Select Semester---
              </option>
              {/* {Object.keys(semesterSubjects).map((sem, index) => (
                <option key={index} value={sem}>
                  {sem}
                </option>
              ))} */}
              <option value="Semester_2">Semester 2</option>
            </select>
          </div>

          {semester && (
            <>
              <div className="w-full max-w-lg bg-gray-200 dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Fixed Subjects (Cannot be Changed)
                </h3>
                {["DSC"].map((category) => (
                  <div key={category} className="mb-3">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                      {category} Subjects:
                    </h4>
                    <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                      {subjectsData[category]?.map((subject, index) => (
                        <li key={index}>{subject}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6">
                {["AEC", "VAC", "SEC", "GE"].map((category) => (
                  <div key={category} className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {category} Subjects
                    </h3>
                    <select
                      className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      value={selectedSubjects[category] || ""}
                      onChange={(e) =>
                        handleSelectChange(category, e.target.value)
                      }
                    >
                      <option value="" disabled>
                        ---Select---
                      </option>
                      {subjectsData[category]?.map((subject, index) => (
                        <option key={index} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <motion.button
                  className={`w-full mt-4 p-3 rounded-lg shadow-md transition duration-200 ease-in-out ${
                    validateSelection()
                      ? "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                  whileHover={validateSelection() ? { scale: 1.05 } : {}}
                  whileTap={validateSelection() ? { scale: 0.95 } : {}}
                  transition={{ duration: 0.5 }}
                  onClick={handleSubmit}
                  disabled={!validateSelection()}
                >
                  Submit Your Subjects
                </motion.button>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center mt-6">
          <h2 className="text-2xl font-semibold text-green-600">
            Subjects submitted successfully!
          </h2>

          {/* Buttons for Add Assignments & Practicals */}
          <div className="flex justify-center gap-4 mt-4">
            <NavLink to="/addAssignments">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add Assignments
              </button>
            </NavLink>
            <NavLink to="/addPracticals">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add Practicals
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectSelection;
