import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { SearchBar } from "./SearchBar";
import { useCallback, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Modal from "./common/Modal";
import { Loader } from "./Loader";
export const Projects = () => {
  const { isDarkMode, globalProjects } = useTheme();
  const [projects, setProjects] = useState(globalProjects);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [flippedId, setFlippedId] = useState(null); // Track which card is flipped
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Fetch projects when the component mounts or when globalProjects changes

  const searchCategory = (project) => {
    for (let i = 0; i < project.category.length; i++) {
      if (project.category[i].toLowerCase() === filter.toLowerCase()) {
        return project.category[i];
      }
    }
  };

  const filtercategory = (project) => {
    if (filter === "all") return project;
    return project.category.includes(searchCategory(project));
  };

  const searchProject = (project) => {
    if (!project || !project.title) return false; // Prevent error if title is missing
    return project.title.toLowerCase().includes(search.toLowerCase());
  };

  // Filter Projects based on selected category
  const filteredProjects = projects.filter(
    (project) => searchProject(project) && filtercategory(project)
  );

  // Handle flip on mobile (tap) and desktop (hover)
  const handleFlip = (id) => {
    if (flippedId === id) {
      setFlippedId(null); // Unflip if already flipped
    } else {
      setFlippedId(id); // Flip the card
    }
  };

  // Function to open the modal with a custom message
  const openModal = useCallback((message) => {
    setModalMessage(message);
    setIsOpen(true);
  }, []);

  // Function to close the modal
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalMessage(""); // Reset message when closing
  }, []);

  const getSourceCode = (project) => {
    if (!project.sourceCode || project.sourceCode.toLowerCase() === "no") {
      openModal(
        "You don’t have permission to access this. Please contact the developer for further assistance."
      );
    } else {
      window.open(project.sourceCode, "_blank");
    }
  };

  return (
    <>
      {projects.length == 0 && (
        <Loader text="Retrieving project data..." showText={true} />
      )}
      {projects.length > 0 && (
        <>
          <Modal isOpen={isOpen} onClose={closeModal} message={modalMessage} />
          <div
            className={`p-6 min-h-screen ${
              isDarkMode
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            <SearchBar
              search={search}
              setSearch={setSearch}
              setFilter={setFilter}
              filter={filter}
              setProjects={setProjects}
              projects={projects}
            />
            {/* <div className="mb-8 flex flex-col sm:flex-row justify-between items-center"> */}
            <h1
              className={`text-3xl mb-8 font-bold text-center ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Total Result:
              <span className="text-blue-500"> {filteredProjects.length}</span>
            </h1>
            {/* </div> */}
            {/* 7 8 9 13 1 17 4 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className={`relative cursor-pointer h-[400px] w-full rounded-2xl shadow-lg ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-300"
                  }`}
                  style={{ perspective: "1000px" }} // Add perspective for 3D effect
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleFlip(project.id)} // Flip on tap (mobile)
                >
                  {/* Flip Card Container */}
                  <motion.div
                    className="w-full h-full"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{
                      rotateY: flippedId === project.id ? 180 : 0, // Flip on click or hover
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }} // Smoother animation
                  >
                    {/* Front of the Card */}
                    <div
                      className="absolute w-full h-full flex flex-col justify-center items-center p-6"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {/* Card ID Badge */}
                      {/* <div
                        className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold ${
                          isDarkMode
                            ? "bg-gray-700 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        ID: {project.id}
                      </div> */}

                      {project.imageURL && (
                        <motion.img
                          src={project.imageURL}
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-t-2xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                      <h3 className="text-2xl font-semibold mb-3 text-center tracking-wide">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2 text-center">
                        {project.category.join(", ")}
                      </p>
                      <p className="text-sm mb-1">
                        <strong>Responsive:</strong> {project.responsive}
                      </p>
                      <p className="text-sm mb-1">
                        <strong>For Better UI Open:</strong> {project.betterUI}
                      </p>
                      <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Back of the Card */}
                    <div
                      className="absolute w-full h-full flex flex-col justify-center items-center p-6"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <h3 className="text-2xl font-semibold mb-3 text-center tracking-wide">
                        {project.title}
                      </h3>
                      <div className="flex justify-center flex-col gap-4">
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition-all duration-500 transform hover:scale-110"
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>

                        <a
                          onClick={() => getSourceCode(project)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gray-800 to-gray-600 text-white font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition-all duration-500 transform hover:scale-110"
                        >
                          <FaGithub />
                          Source Code
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
