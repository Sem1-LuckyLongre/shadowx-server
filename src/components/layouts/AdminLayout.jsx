import { Navigate, NavLink, Outlet } from "react-router-dom";
import {
  FiUsers,
  FiFolder,
  FiMenu,
  FiX,
  FiMessageCircle,
} from "react-icons/fi";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useTheme();
  const userData = user?.userData || {};
  if (!userData.isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <div className="bg-gray-100 md:p-6 -z-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Toggle Button */}
      <button
        className="md:hidden p-4 focus:outline-none"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FiMenu size={24} className="text-gray-800 dark:text-white" />
      </button>

      {/* Sidebar */}
      <aside
        className={`w-72 p-6 shadow-xl flex flex-col backdrop-blur-md rounded-r-3xl bg-white dark:bg-gray-800 transition-transform transform md:translate-x-0 fixed md:relative -z-1 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-800 dark:text-white"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FiX size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Admin Panel
        </h2>
        <nav className="flex-1">
          <ul>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? "text-blue-600 dark:text-blue-400" : ""
              }
            >
              <li className="p-3 flex items-center gap-3 hover:bg-blue-500/20 dark:hover:bg-blue-600/30 cursor-pointer rounded-lg transition-all duration-300">
                <FiUsers
                  size={20}
                  className="text-blue-600 dark:text-blue-400"
                />
                Users
              </li>
            </NavLink>
            <NavLink
              to="/admin/messages"
              className={({ isActive }) =>
                isActive ? "text-blue-600 dark:text-blue-400" : ""
              }
            >
              <li className="p-3 flex items-center gap-3 hover:bg-blue-500/20 dark:hover:bg-blue-600/30 cursor-pointer rounded-lg transition-all duration-300">
                <FiMessageCircle
                  size={20}
                  className="text-blue-600 dark:text-blue-400"
                />
                Messages
              </li>
            </NavLink>
            <NavLink
              to="/admin/projects"
              className={({ isActive }) =>
                isActive ? "text-blue-600 dark:text-blue-400" : ""
              }
            >
              <li className="p-3 flex items-center gap-3 hover:bg-blue-500/20 dark:hover:bg-blue-600/30 cursor-pointer rounded-lg transition-all duration-300">
                <FiFolder
                  size={20}
                  className="text-blue-600 dark:text-blue-400"
                />
                Projects
              </li>
            </NavLink>
          </ul>
        </nav>
      </aside>

      {/* Main Content  */}
      <div className="flex-1 p-4 md:p-8">
        <main className="rounded-2xl shadow-xl p-4 md:p-6 bg-white dark:bg-gray-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
