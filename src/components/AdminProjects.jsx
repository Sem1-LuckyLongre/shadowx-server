import { FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { Loader } from "./Loader";

export const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({});
  const [loading, setLoading] = useState(false);
  const { URI, autherizedToken, user } = useTheme();

  const fields = [
    { name: "title", type: "text", placeholder: "Project Title" },
    {
      name: "category",
      type: "text",
      placeholder: "Category (comma separated)",
    },
    { name: "liveLink", type: "text", placeholder: "Live Link" },
    { name: "sourceCode", type: "text", placeholder: "Source Code Link" },
    { name: "responsive", type: "text", placeholder: "Responsive (YES or NO)" },
    { name: "imageURL", type: "text", placeholder: "Image URL" },
    {
      name: "description",
      type: "textarea",
      placeholder: "Project Description",
    },
    { name: "betterUI", type: "text", placeholder: "Best UI for (PC/Mobile)" },
  ];

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      const response = await fetch(`${URI}/api/admin/projects`, {
        method: "GET",
        headers: { Authorization: autherizedToken },
      });
      const data = await response.json();
      if (response.ok) {
        const sortedProjects = [...data].sort((a, b) => b.id - a.id);
        setProjects(sortedProjects);
        // console.log("changed to top");
      } else {
        setProjects([]);
        toast.error("Failed to fetch projects");
      }
    } catch (error) {
      toast.error("Failed To Fetch Projects!");
    }
  };

  const validateForm = () => {
    // let newErrors = {};
    if (!newProject.title) {
      toast.error("Title is required");
      return false;
    }
    if (!newProject.category) {
      toast.error("Category is required");
      return false;
    }
    if (!newProject.liveLink) {
      toast.error("Live link is required");
      return false;
    }
    if (!newProject.sourceCode) {
      toast.error("Source code is required");
      return false;
    }
    if (!newProject.imageURL) {
      toast.error("Image URL is required");
      return false;
    }
    if (!newProject.description) {
      toast.error("Description is required");
      return false;
    }
    if (!newProject.betterUI) {
      toast.error("Better UI field is required");
      return false;
    }
    if (
      !newProject.responsive ||
      !["YES", "NO"].includes(newProject.responsive.toUpperCase())
    ) {
      return toast.error("Responsive must be YES or NO");
    }
    // setErrors(newErrors);
    return true;
  };

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAddProject = async () => {
    if (validateForm()) {
      if (!projects) return;
      // Auto-generate unique ID
      setLoading(true);
      const newId = projects?.length + 1;

      const formattedProject = {
        ...newProject,
        id: newId,
        category: newProject.category.split(",").map((c) => c.trim()),
        responsive: newProject.responsive.toUpperCase(),
      };
      console.log(JSON.stringify(formattedProject));

      try {
        const response = await fetch(`${URI}/api/admin/projects/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: autherizedToken,
          },
          body: JSON.stringify(formattedProject),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          toast.success(data.msg || "Project added successfully");
          setShowForm(false);
          getProjects();
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(data.msg || "Failed to add project");
        }
      } catch (error) {
        toast.error("Error adding project");
      }
    }
  };

  const deleteProject = async (project) => {
    const password = prompt("Enter a Password");
    console.log(user.userData._id),"updated";

    if (!password || password != user.userData._id) {
      toast.error("Wrong Password!");
      return;
    }
    try {
      const response = await fetch(
        `${URI}/api/admin/project/delete/${project._id}`,
        {
          method: "DELETE",
          headers: { Authorization: autherizedToken },
        }
      );
      if (response.ok) {
        toast.success("Project deleted successfully");
        getProjects();
      } else {
        toast.error("Failed to delete project");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting project");
    }
  };

  return (
    <div className="p-5 dark:bg-gray-900 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-black dark:text-white mb-5">
        Projects
      </h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "Add Project"}
      </button>
      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg mb-5 space-y-4 border dark:border-gray-700">
          {fields.map((field) => (
            <div key={field.name}>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600"
                  onChange={handleInputChange}
                ></textarea>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600"
                  onChange={handleInputChange}
                />
              )}
              {/* {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )} */}
            </div>
          ))}
          <button
            className={`${
              !loading ? "bg-green-500" : "bg-gray-300"
            } text-white px-4 py-3 rounded-lg w-full hover:bg-green-600`}
            onClick={handleAddProject}
          >
            {!loading ? "Submit Project" : "Submiting..."}
          </button>
        </div>
      )}

      {projects.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="dark:bg-gray-800 bg-white p-5 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 flex flex-col space-y-3"
            >
              <img
                src={proj.imageURL}
                alt={proj.title}
                className="rounded-lg object-cover w-full h-40"
              />
              <h2 className="text-xl font-semibold text-black dark:text-white">
                {proj.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-300 text-sm">
                {proj.description}
              </p>
              <div className="text-sm flex flex-wrap gap-2">
                {proj.category.map((cat, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 rounded-full text-xs"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <a
                  href={proj.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 dark:text-green-400 hover:underline"
                >
                  Live Preview
                </a>
                <a
                  href={proj.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Source Code
                </a>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    proj.responsive === "YES"
                      ? "bg-green-200 text-green-700 dark:bg-green-800 dark:text-green-200"
                      : "bg-red-200 text-red-700 dark:bg-red-800 dark:text-red-200"
                  }`}
                >
                  {proj.responsive === "YES" ? "Responsive" : "Not Responsive"}
                </span>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => deleteProject(proj)}
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
