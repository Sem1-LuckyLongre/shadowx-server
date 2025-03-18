import { FaSearch, FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";
// import Myprojects from "../components/Myprojects.json";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export const SearchBar = ({
  search,
  setSearch,
  filter,
  setFilter,
  setProjects,
  projects,
}) => {
  const { isDarkMode } = useTheme();
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to manage filter section visibility

  // useEffect(() => {
  //   setisDarkMode(theme === "dark");
  // }, [theme]);

  const handleSelectChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSort = (order) => {
    const sortedProjects = [...projects].sort((a, b) => {
      return order === "newest" ? b.id - a.id : a.id - b.id;
    });
    setProjects(sortedProjects);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen); // Toggle filter section visibility
  };

  return (
    <div
      className={`flex flex-col justify-between items-center w-full p-6 gap-6 
        ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-transparent text-gray-900"
        }
      `}
    >
      {/* Search Bar and Filter Icon (PC Layout) */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-6">
        {/* Search Bar */}
        <motion.div className="relative w-full max-w-lg">
          <motion.input
            type="text"
            value={search}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
            placeholder="Search My Projects..."
            className={`w-full p-3 pl-12 pr-4 rounded-full shadow-md border outline-none transition-all duration-300 
              ${
                isDarkMode
                  ? "bg-transparent text-white border-gray-300 focus:ring-blue-500"
                  : "bg-white text-gray-900 border-gray-600 focus:ring-gray-500"
              }
            `}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileFocus={{ scale: 1.05 }}
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch size={18} />
          </span>
        </motion.div>

        {/* Filter Icon (PC Layout) */}
        <div className="hidden sm:flex justify-center items-center">
          <button
            onClick={toggleFilter}
            className={`p-3 rounded-full shadow-md transition-all duration-300 hover:scale-110 
              ${
                isDarkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-400 hover:bg-blue-500 text-black"
              }
            `}
          >
            <FaFilter size={20} />
          </button>
        </div>
      </div>

      {/* Filter Icon (Mobile Layout) */}
      <div className="flex sm:hidden justify-center items-center w-full">
        <button
          onClick={toggleFilter}
          className={`p-3 rounded-full shadow-md transition-all duration-300 hover:scale-110 
            ${
              isDarkMode
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-blue-400 hover:bg-blue-500 text-black"
            }
          `}
        >
          <FaFilter size={20} />
        </button>
      </div>

      {/* Collapsible Filter Section */}
      {isFilterOpen && (
        <motion.div
          className={`flex flex-col justify-start items-center w-full gap-6 p-6 rounded-lg shadow-lg transition-all duration-300 
            ${
              isDarkMode
                ? "bg-gray-800 text-white"
                : "bg-transparent text-gray-900"
            }
          `}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {/* Filters Heading */}
          <h2
            className={`text-xl text-center font-semibold w-full ${
              isDarkMode ? "text-green-300" : "text-gray-900"
            } sm:text-center`}
          >
            Filters
          </h2>

          {/* Sorting Buttons */}
          <div className="flex gap-4 w-full justify-evenly sm:justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSort("newest");
              }}
              className={`px-4 py-2 rounded-lg shadow-md font-semibold transition-all duration-300 
                ${
                  isDarkMode
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-blue-400 hover:bg-blue-500 text-black"
                }
              `}
            >
              Newely
            </button>
            <button
              onClick={() => handleSort("oldest")}
              className={`px-4 py-2 rounded-lg shadow-md font-semibold transition-all duration-300 
                ${
                  isDarkMode
                    ? "bg-purple-500 hover:bg-purple-600 text-white"
                    : "bg-purple-400 hover:bg-purple-500 text-black"
                }
              `}
            >
              Older
            </button>
          </div>

          {/* Category Filter Dropdown */}
          <div className="flex justify-center items-center w-full sm:w-auto">
            <select
              className={`px-6 py-3 rounded-full shadow-md border-2 outline-none transition-all duration-300 
                ${
                  isDarkMode
                    ? "bg-transparent text-white border-gray-400 hover:border-opacity-50 hover:shadow-lg"
                    : "bg-white text-gray-900 border-gray-600 hover:border-gray-400 hover:shadow-lg"
                }
              `}
              value={filter}
              onChange={handleSelectChange}
            >
              <option value="all">All</option>
              <option value="CSS">CSS</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React JS">React JS</option>
              <option value="ShadowXVs">ShadowX Versions</option>
            </select>
          </div>
        </motion.div>
      )}
    </div>
  );
};
