import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGraduationCap,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Loader } from "./Loader";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignUp = () => {
  if (localStorage.getItem("Registration")) {
    window.location.assign("/");
  }

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const { storeTokenIntoLocalStorage } = useTheme();
  const navigate = useNavigate();

  const inputFields = [
    {
      label: "Full Name",
      type: "text",
      name: "name",
      icon: FaUser,
      validation: (value) => value.length >= 4,
      errorMessage: "Name must be at least 4 characters",
    },
    // {
    //   label: "Course",
    //   type: "text",
    //   name: "course",
    //   icon: FaGraduationCap,
    //   validation: (value) => value.length >= 3,
    //   errorMessage: "Course must be at least 3 characters",
    // },
    {
      label: "Email Address",
      type: "email",
      name: "email",
      icon: FaEnvelope,
      validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorMessage: "Invalid email format",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      icon: FaLock,
      validation: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        ),
      errorMessage:
        "Password must be 8 characters long and contain uppercase, lowercase, number, and special character",
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      icon: FaLock,
      validation: (value) => value === formData.password,
      errorMessage: "Passwords do not match",
    },
  ];

  const validateForm = () => {
    for (let field of inputFields) {
      if (!formData[field.name]) {
        toast.error(`${field.label} is required`);
        return false;
      } else if (!field.validation(formData[field.name])) {
        toast.error(field.errorMessage);
        return false;
      }
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const { URI } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      const { confirmPassword, ...dataToSend } = formData;

      try {
        const response = await fetch(`${URI}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          setIsLoading(false);
          const res_data = await response.json();

          if (res_data.msg === "Registraction Succesfull") {
            storeTokenIntoLocalStorage(res_data.token);
            toast.success("Registration Successful!");

            setTimeout(() => {
              navigate("/SignIn");
            }, 1000);
          }
        } else {
          setIsLoading(false);
          const res_data = await response.json();
          if (res_data.msg === "User already exists!") {
            toast.error("User Already Exists...");
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.error("register " + error);
        toast.error("Something went wrong! Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] py-5 dark:bg-gradient-to-br dark:from-gray-900 dark:to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800/60 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Join our community today!
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center mb-4">
            <Loader text="Registering you…" showText={true} />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {inputFields.map((field) => (
              <div key={field.name} className="relative">
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 p-2">
                  <div className="pl-4 text-gray-500 dark:text-gray-400">
                    <field.icon />
                  </div>
                  <input
                    type={
                      field.type === "password"
                        ? passwordVisibility[field.name]
                          ? "text"
                          : "password"
                        : field.type
                    }
                    name={field.name}
                    placeholder={field.label}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-transparent text-gray-900 dark:text-white focus:outline-none autofill:bg-blue-500 autofill:text-white"
                  />
                  {field.type === "password" && (
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field.name)}
                      className="pr-4 hover:bg-black text-gray-500 dark:text-gray-400"
                    >
                      {passwordVisibility[field.name] ? (
                        <FaEye />
                      ) : (
                        <FaEyeSlash />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-700 text-white py-3 rounded-lg shadow-lg transition-transform duration-300"
          >
            Sign Up
          </button>
          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <NavLink
                to="/SignIn"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-purple-400 transition duration-300 underline-offset-4 hover:underline"
              >
                Login
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
