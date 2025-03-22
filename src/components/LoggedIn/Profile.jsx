import { useState, useRef, useEffect } from "react";
import { FaCamera, FaExclamationCircle } from "react-icons/fa";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";
import { AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../../context/ThemeContext";
import { toast } from "react-toastify";

export const Profile = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("profile.png");
  const [showPasskey, setShowPasskey] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, user, URI, setGlobalProfileImg } = useTheme();

  // Ensure user and userData exist before accessing properties
  const userData = user?.userData || {};
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/SignIn");
      return;
    }
    // const storedProfileImage = localStorage.getItem("ProfileImage");
    // if (storedProfileImage) {
    //   setProfileImage(storedProfileImage);
    // }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(
          `${URI}/api/upload/profile/${userData._id}`
        );
        if (!response.ok) throw new Error("Failed to fetch image");

        const data = await response.json();
        if (data.imageUrl) {
          setProfileImage(`${data.imageUrl}`);
          setGlobalProfileImg(data.imageUrl);
        }
      } catch (error) {
        toast.error("Error fetching profile image:", error);
      }
    };
    if (user) {
      fetchProfileImage();
    }
  }, [user]); // Add dependency to ensure it runs when `userData._id` is available

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userData._id); // User ID Bhejna Zaroori Hai

    try {
      const response = await fetch(`${URI}/api/upload/profile`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setProfileImage(data.imageUrl); // Database se Image URL Fetch
      } else {
        console.error("Image upload failed:", data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const userInfoFields = [
    { label: "Name", value: userData.name },
    { label: "Email", value: userData.email },
    { label: "Course", value: userData.course },
    { label: "Phone No.", value: userData.phone },
    { label: "Roll Number", value: userData.rollNo },
    { label: "Department", value: userData.department },
    {
      label: "Pass Key",
      value: userData.passkey
        ? showPasskey
          ? userData.passkey
          : "••••••••"
        : null,
    },
  ].filter((field) => field.value); // Remove empty fields

  return (
    <>
      {!user ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-[rgb(var(--background))] dark:bg-gradient-to-br dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
          {isLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <Loader />
            </div>
          )}
          {showNotification && (
            <a href="#ediNow">
              <div className="fixed top-40 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-blue-300 to-blue-400 text-white px-6 py-2 rounded-lg shadow-lg flex items-center gap-6 max-w-xs sm:max-w-md md:max-w-lg w-full">
                <FaExclamationCircle className="text-2xl text-red-700" />
                <div className="flex">
                  <p className="font-semibold text-sm sm:text-lg md:text-xl">
                    Please Edit Your Profile For Pass Key!
                  </p>
                </div>
                <button
                  onClick={() => setShowNotification(false)}
                  className="text-yellow-800 dark:text-yellow-100 font-bold hover:text-red-600"
                >
                  <AiOutlineClose
                    size={20}
                    className="bg-blue-400 text-red-600"
                  />
                </button>
              </div>
            </a>
          )}

          <div className="container mx-auto px-4 py-8">
            <div className="bg-white dark:bg-gray-800/60 rounded-2xl shadow-2xl backdrop-blur-lg p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row items-center mb-8">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 shadow-lg transition-transform duration-300 hover:scale-105"
                  />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
                  >
                    <FaCamera />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="md:ml-8 mt-4 md:mt-0 text-center flex flex-col items-center md:text-left">
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                    {userData.name || "User Name"}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {userData.email || "user@example.com"}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {userInfoFields.map((field, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg flex flex-col border border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">
                      {field.label}
                    </p>
                    <p className="text-gray-900 dark:text-white font-semibold flex items-center">
                      {field.label === "Pass Key" ? (
                        <span className="flex items-center">
                          <span className="mr-2">{field.value}</span>
                          {userData.passkey && (
                            <button
                              onClick={() => setShowPasskey(!showPasskey)}
                              aria-label="Toggle Pass Key Visibility"
                            >
                              <FontAwesomeIcon
                                icon={showPasskey ? faEyeSlash : faEye}
                                className="text-black dark:text-white"
                              />
                            </button>
                          )}
                        </span>
                      ) : (
                        field.value
                      )}
                    </p>
                  </div>
                ))}
              </div>

              {!userData.passkey && (
                <button
                  id="ediNow"
                  onClick={() => navigate("/LoggedIn/EditProfile")}
                  className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
