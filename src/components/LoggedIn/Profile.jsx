import React, { useState, useRef, useEffect } from "react";
import { FaCamera, FaExclamationCircle } from "react-icons/fa";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";
import { AiOutlineClose } from "react-icons/ai";

export const Profile = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("profile.png");
  const [userData, setUserData] = useState({});
  const [showPasskey, setShowPasskey] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Load user data on component mount
  useEffect(() => {
    const Login = localStorage.getItem("LoggedIn");
    if (!Login) {
      navigate("/SignIn");
      return;
    }

    const storedUserData = JSON.parse(localStorage.getItem("User_Data")) || {};
    setUserData(storedUserData);

    const storedProfileImage = localStorage.getItem("ProfileImage");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }

    if (!storedUserData.passkey) {
      setShowNotification(true);
    }
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setProfileImage(imageDataUrl);
        localStorage.setItem("ProfileImage", imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const userInfoFields = [
    { label: "Name", value: userData.name },
    { label: "Roll Number", value: userData.roll },
    { label: "Course", value: userData.course },
    { label: "Department", value: userData.department },
    { label: "Email", value: userData.email },
    {
      label: "Pass Key",
      value: userData.passkey
        ? showPasskey
          ? userData.passkey
          : "••••••••"
        : null, // If no passkey, set value to null
    },
  ];

  return (
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
              <AiOutlineClose size={20} className="bg-blue-400 text-red-600" />
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
            {userInfoFields.map(
              (field, index) =>
                field.value && ( // Only render the field if value exists
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg flex items-center border border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {field.label === "Pass Key" ? (
                        <span className="flex items-center">
                          <span className="mr-2">{field.value}</span>
                          {userData.passkey && ( // Only show toggle button if passkey exists
                            <button
                              onClick={() => setShowPasskey(!showPasskey)}
                              aria-label="Toggle Pass Key Visibility"
                            >
                              {showPasskey ? (
                                <FontAwesomeIcon
                                  icon={faEyeSlash}
                                  className="text-black dark:text-white"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="text-black dark:text-white"
                                />
                              )}
                            </button>
                          )}
                        </span>
                      ) : (
                        field.value
                      )}
                    </p>
                  </div>
                )
            )}
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
  );
};
