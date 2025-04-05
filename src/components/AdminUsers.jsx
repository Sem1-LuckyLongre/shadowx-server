import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Loader } from "./Loader";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { URI, autherizedToken, user } = useTheme();
  const DoNotDeleteUser = false; // Set this to true if you want to prevent deletion

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${URI}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: autherizedToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        toast.error(data.msg || "Failed to fetch users");
      }
    } catch (error) {
      toast.error("Failed To Fetch Users!");
      console.log(error);
    }
  };

  const deleteUser = async (user) => {
    if (DoNotDeleteUser) {
      toast.error("You can not delete this user.");
      return;
    }
    if (user.isAdmin) {
      toast.error("You can not delete the Admin.");
      return;
    }
    try {
      const response = await fetch(`${URI}/api/admin/user/delete/${user._id}`, {
        method: "DELETE",
        headers: {
          Authorization: autherizedToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("User deleted successfully");
      }
      console.log("User after delete", data);
      getAllUsers(); // Refresh user list after deletion
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  if (!user?.userData.isAdmin) {
    window.location.assign("/");
  }

  return (
    <div
      className="p-5 shadow-lg rounded-lg mt-5 max-w-5xl mx-auto transition-colors 
        dark:bg-gray-900 dark:text-white bg-white text-gray-900
      "
    >
      {users.length > 0 && (
        <>
          <h1 className="text-2xl text-center font-bold mb-4">
            Users Management
          </h1>
          {/* Desktop View */}
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full border rounded-lg shadow-md">
              <thead>
                <tr
                  className="dark:bg-gray-800 dark:text-white
                       bg-gray-900 text-white"
                >
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Course</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr
                      key={user._id}
                      className={`border-b hover:bg-opacity-80 transition 
                         
                          hover:bg-gray-100
                      ${
                        user.isAdmin
                          ? "bg-gray-200 dark:bg-blue-700"
                          : "dark:bg-gray-800 dark:hover:bg-gray-700"
                      }`}
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.course}</td>
                      <td className="py-3 px-4 font-semibold">
                        {user.isAdmin ? "Admin" : "User"}
                      </td>
                      <td className="py-3 px-4 flex gap-2 justify-center">
                        <Link to={`/admin/users/${user._id}/edit`}>
                          <button className="text-blue-400 hover:text-blue-600">
                            <FiEdit size={20} />
                          </button>
                        </Link>
                        <button
                          className="text-red-400 hover:text-red-600"
                          onClick={() => deleteUser(user)}
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user._id}
                  className={`shadow-md rounded-lg p-4 border transition
                     dark:bg-gray-800 dark:border-gray-700
                      bg-white border-gray-300 ${
                        user.isAdmin ? "border-yellow-500" : ""
                      }`}
                >
                  <h2 className="text-lg font-semibold">
                    {user.name}
                    {user.isAdmin && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded ml-2">
                        Admin
                      </span>
                    )}
                  </h2>
                  <p className="text-gray-400">{user.email}</p>
                  <p className="text-gray-400">📚 {user.course}</p>
                  <div className="flex gap-3 mt-3">
                    <Link to={`/admin/users/${user._id}/edit`}>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center gap-1">
                        <FiEdit size={16} /> Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition flex items-center gap-1"
                      onClick={() => deleteUser(user)}
                    >
                      <FiTrash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No users found.</p>
            )}
          </div>
        </>
      )}
      {!users.length > 0 && (
        <Loader text="Retrieving users..." showText={true} />
      )}
    </div>
  );
};
