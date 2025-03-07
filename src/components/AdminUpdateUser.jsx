import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import { Loader } from "./Loader";

export const AdminUpdateUser = () => {
  const { URI, autherizedToken } = useTheme();
  const params = useParams();

  const [user, setUser] = useState(null);

  const getSingleUserById = async () => {
    try {
      const response = await fetch(`${URI}/api/admin/user/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: autherizedToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getSingleUserById();
  }, []);

  const handleUpdate = async (formData, e) => {
    e.preventDefault();
    const updatedUserData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        `${URI}/api/admin/user/update/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedUserData),
          headers: {
            Authorization: autherizedToken,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Updated Successfully");
        getSingleUserById();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      {user && (
        <div className="max-w-lg mx-auto p-6 dark:bg-gray-900 bg-gray-200 text-white rounded-lg shadow-lg mt-10">
          <h2 className="text-2xl font-bold dark:text-white text-black text-center mb-6">
            Update User
          </h2>
          <form
            onSubmit={(e) => handleUpdate(new FormData(e.target), e)}
            className="space-y-4"
          >
            {Object.entries(user).map(
              ([key, value]) =>
                key !== "_id" &&
                key !== "__v" && (
                  <div key={key}>
                    <label className="block dark:text-gray-100 text-black text-sm font-semibold mb-2">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    {key === "ProfileImage" ? (
                      <div className="flex flex-row items-center">
                        <img
                          src={value ? value : "/default-avatar.png"} // Default image agar URL nahi hai
                          alt="Profile"
                          className="w-16 h-16 rounded-full border border-gray-400 object-cover"
                        />
                      </div>
                    ) : (
                      <input
                        type={key === "email" ? "email" : "text"}
                        className={`w-full p-3 bg-white text-black border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          key === "isAdmin" ? "cursor-not-allowed" : ""
                        }`}
                        placeholder={`Enter ${key}`}
                        name={key}
                        defaultValue={value}
                        disabled={key === "isAdmin"}
                      />
                    )}
                  </div>
                )
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Update
            </button>
          </form>
        </div>
      )}
      {!user && <Loader />}
    </>
  );
};
