import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { SearchBar } from "./SearchBar";
import { useCallback, useEffect, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Modal from "./common/Modal";
import { Loader } from "./Loader";
import { toast } from "react-toastify";

export const Projects = ({ globalProjects, setGlobalProjects }) => {
  const { isDarkMode, URI } = useTheme();
  const [projects, setProjects] = useState(globalProjects);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [flippedId, setFlippedId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const fetchProjects = async () => {
    try {
      const projectsData = await fetch(`${URI}/api/data/project`);
      const data = await projectsData.json();
      if (projectsData.ok) {
        const sortedProjects = [...data].sort((a, b) => b.id - a.id);
        setProjects(sortedProjects);
        setGlobalProjects(sortedProjects);
      } else {
        toast.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (globalProjects.length > 0) return;
    fetchProjects();
  }, [URI]);

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
    if (!project || !project.title) return false;
    return project.title.toLowerCase().includes(search.toLowerCase());
  };

  const filteredProjects = projects.filter(
    (project) => searchProject(project) && filtercategory(project)
  );

  const handleFlip = (id) => {
    if (flippedId === id) {
      setFlippedId(null);
    } else {
      setFlippedId(id);
    }
  };

  const openModal = useCallback((message) => {
    setModalMessage(message);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalMessage("");
  }, []);

  const getSourceCode = (project) => {
    if (!project.sourceCode || project.sourceCode.toLowerCase() === "no") {
      openModal(
        "You don't have permission to access this. Please contact the developer for further assistance."
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
            <h1
              className={`text-3xl mb-8 font-bold text-center ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Total Result:
              <span className="text-blue-500"> {filteredProjects.length}</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className={`relative cursor-pointer h-[500px] w-full rounded-2xl shadow-lg overflow-hidden ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-300"
                  }`}
                  style={{ perspective: "1000px" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleFlip(project.id)}
                >
                  {/* Flip Card Container */}
                  <motion.div
                    className="w-full h-full"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{
                      rotateY: flippedId === project.id ? 180 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  >
                    {/* Front of the Card */}
                    <div
                      className="absolute w-full h-full flex flex-col p-4"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {project.imageURL && (
                        <motion.img
                          src={project.imageURL}
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}

                      <div className="flex-1 flex flex-col">
                        <h3 className="text-xl font-semibold mb-2 text-center">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-400 mb-3 text-center">
                          {project.category.join(", ")}
                        </p>

                        <div className="mb-3">
                          <p className="text-sm mb-1">
                            <span className="font-medium">Responsive:</span>{" "}
                            {project.responsive}
                          </p>
                          <p className="text-sm mb-1">
                            <span className="font-medium">
                              For Better UI Open:
                            </span>{" "}
                            {project.betterUI}
                          </p>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Back of the Card */}
                    <div
                      className="absolute w-full h-full flex flex-col justify-center items-center p-6"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <h3 className="text-2xl font-semibold mb-6 text-center">
                        {project.title}
                      </h3>
                      <div className="flex flex-col gap-4 w-full">
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition-all duration-300"
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>

                        <button
                          onClick={() => getSourceCode(project)}
                          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gray-800 to-gray-600 text-white font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition-all duration-300"
                        >
                          <FaGithub />
                          Source Code
                        </button>
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
