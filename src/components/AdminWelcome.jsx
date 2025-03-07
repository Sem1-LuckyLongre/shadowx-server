import { FiShield } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export const AdminWelcome = () => {
  const { user } = useTheme();
  return (
    <div className="flex flex-col items-center  h-screen text-center px-6">
      {user && user.userData.isAdmin ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center">
          <FiShield
            size={50}
            className="text-blue-600 dark:text-blue-400 mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {user.userData.name}.
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
            You have full access to manage the system.
          </p>
        </div>
      ) : (
        <div className="flex justify-centermd:items-center md:justify-start md:mt-10 h-screen flex-col text-center">
          <h2 className="text-4xl font-extrabold text-red-600 mb-2">
            Access Denied!
          </h2>
          <p className="text-xl font-semibold text-yellow-500">
            You do not have the necessary permissions to access this page.
          </p>
          <p className="text-black dark:text-white mt-2">
            Please contact the administrator if you believe this is a mistake.
          </p>
        </div>
      )}
    </div>
  );
};
