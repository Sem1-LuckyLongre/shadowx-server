import React, { useState, useEffect, useRef } from "react";
import {
  FaUser,
  FaIdCard,
  FaGraduationCap,
  FaBuilding,
  FaEnvelope,
  FaSave,
  FaTimes,
  FaKey,
} from "react-icons/fa";
import { Loader } from "../Loader";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
  let navigate = useNavigate();
  useEffect(() => {
    // Check authentication
    const Login = localStorage.getItem("LoggedIn");
    if (!Login) {
      navigate("/SignIn");
      return;
    }
  }, []);

  const [userData, setUserData] = useState({
    name: "",
    roll: "",
    course: "",
    department: "",
    email: "",
    passkey: "",
  });

  const [error, setError] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  const inputFields = [
    {
      label: "Name",
      type: "text",
      name: "name",
      icon: FaUser,
      placeholder: "Enter Your Full Name",
      validation: (value) => value.length >= 4,
    },
    {
      label: "Roll Number",
      type: "text",
      name: "roll",
      icon: FaIdCard,
      placeholder: "Enter Your Roll Number",
      validation: (value) => /^\d{8}$/.test(value),
    },
    {
      label: "Course",
      type: "text",
      name: "course",
      icon: FaGraduationCap,
      placeholder: "Enter Your Course",
      validation: (value) => value.length >= 3,
    },
    {
      label: "Department",
      type: "text",
      name: "department",
      icon: FaBuilding,
      placeholder: "Enter Your Department",
      validation: (value) => value.length >= 8,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      icon: FaEnvelope,
      placeholder: "Enter Your Email",
      validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    },
    {
      label: "Pass Key",
      type: "Text",
      name: "passkey",
      icon: FaKey,
      placeholder: "Enter Your Passkey For Reset Your Password",
      validation: (value) => value.length >= 4,
    },
  ];

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("User_Data"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name.toLowerCase()]: value,
    }));

    // Clear error for the current field
    setError((prev) => ({
      ...prev,
      [name.toLowerCase()]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    inputFields.forEach((field) => {
      const value = userData[field.name.toLowerCase()];

      if (!value) {
        newErrors[field.name.toLowerCase()] = `${field.label} is required`;
        isValid = false;
      } else if (!field.validation(value)) {
        switch (field.name) {
          case "name":
            newErrors[field.name.toLowerCase()] =
              "Name Must Be at Least 4 Characters";
            break;
          case "roll":
            newErrors[field.name.toLowerCase()] =
              "Roll Number Must Be 8 Digits";
            break;
          case "course":
            newErrors[field.name.toLowerCase()] =
              "Course Must Be at Least 3 Characters";
            break;
          case "department":
            newErrors[field.name.toLowerCase()] =
              "Department Must Be at Least 5 Characters";
            break;
          case "email":
            newErrors[field.name.toLowerCase()] = "Invalid Email Format";
            break;
          case "passkey":
            newErrors[field.name.toLowerCase()] =
              "PassKey Must Be at Least 4 Characters";
            break;
          default:
            break;
        }
        isValid = false;
      }
    });

    setError(newErrors);
    return isValid;
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);

        // Save updated user data
        localStorage.setItem("User_Data", JSON.stringify(userData));

        // Redirect after a short delay
        setTimeout(() => {
          window.location.assign("/");
        }, 2000);
      }, 2000);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] dark:bg-gradient-to-br dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex justify-between items-center shadow-lg text-white">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <button
          onClick={handleCancel}
          className="flex items-center bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
        >
          <FaTimes className="mr-2" /> Cancel
        </button>
      </header>

      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Loader />
        </div>
      )}

      {/* Success Message */}
      {isSubmitted && (
        <div className="fixed top-0 left-0 right-0 bg-green-600 text-white text-center py-4 z-50">
          Profile Updated Successfully!
        </div>
      )}

      {/* Form Container */}
      <div className="container mx-auto px-4 py-8">
        <form
          ref={formRef}
          onSubmit={handleSave}
          className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-2xl backdrop-blur-lg p-8 max-w-2xl mx-auto border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Update Your Details
          </h2>

          <div className="space-y-6">
            {inputFields.map((field) => (
              <div key={field.name} className="relative">
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                  <div className="pl-4 text-gray-500 dark:text-gray-400">
                    <field.icon className="h-6 w-6  mr-2" /> {/* Adjusted icon size and margin */}
                  </div>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={userData[field.name.toLowerCase()] || ""}
                    onChange={handleChange}
                    className="w-full p-3 bg-transparent text-gray-900 dark:text-white focus:outline-none"
                  />
                </div>
                {error[field.name.toLowerCase()] && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1 pl-4">
                    {error[field.name.toLowerCase()]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 ">
          <button
  type="submit"
  className="bg-gradient-to-r from-green-500 to-green-700 flex items-center hover:from-green-400 hover:to-green-600 text-white py-2 px-4 rounded-lg transition duration-300"
>
  <FaSave className="mr-2" /> Save Changes
</button>

          </div>
        </form>
      </div>
    </div>
  );
};
