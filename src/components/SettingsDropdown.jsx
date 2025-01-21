import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaSignOutAlt, FaTrash } from 'react-icons/fa';

const SettingsDropdown = ({ handleLogoutEvent, handleDeleteEvent }) => {
  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl ring-2 ring-gray-200 dark:ring-white/10 overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
      <div className="p-4 space-y-2">
        <Link
          to="/LoggedIn/EditProfile"
          className="block w-full text-center bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-lg transition-colors"
        >
          <AiOutlineEdit className="inline mr-2" /> Edit Profile
        </Link>
        <button
          onClick={handleLogoutEvent}
          className="w-full flex items-center justify-center bg-red-50 hover:bg-red-100 dark:bg-red-500/20 dark:hover:bg-red-500/30 text-red-600 dark:text-red-300 px-4 py-2 rounded-lg transition-colors"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
        <button
          onClick={handleDeleteEvent}
          className="w-full flex items-center justify-center bg-red-100 hover:bg-red-200 dark:bg-red-700/20 dark:hover:bg-red-700/30 text-red-700 dark:text-red-400 px-4 py-2 rounded-lg transition-colors"
        >
          <FaTrash className="mr-2" /> Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsDropdown;
