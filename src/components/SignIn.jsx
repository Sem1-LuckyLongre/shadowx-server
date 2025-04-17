import { useState, useRef } from "react";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaGithub,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Loader } from "./Loader";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { storeTokenIntoLocalStorage, URI } = useTheme();
  const formRef = useRef(null);

  const inputFields = [
    {
      label: "Email Address",
      type: "email",
      name: "email",
      icon: FaEnvelope,
      validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorMsg: "Please enter a valid email address",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      icon: FaLock,
      validation: (value) => value.length >= 8,
      errorMsg: "Password must be at least 8 characters",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const formData = new FormData(formRef.current);
    const formUserData = Object.fromEntries(formData.entries());

    let isValid = true;
    const newErrors = {};

    inputFields.forEach((field) => {
      const value = formUserData[field.name];
      if (!value) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      } else if (!field.validation(value)) {
        newErrors[field.name] = field.errorMsg;
        isValid = false;
      } else {
        newErrors[field.name] = "";
      }
    });

    setErrors(newErrors);

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${URI}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formUserData),
      });

      const res_data = await response.json();

      if (response.ok) {
        if (res_data.msg === "Login Succesfull") {
          storeTokenIntoLocalStorage(res_data.token);
          // toast.success("Login Successful!");
          setTimeout(() => window.location.assign("/"), 2000);
        }
      } else {
        toast.error(res_data.msg);
      }
    } catch (error) {
      console.error("Login error: ", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const socialRegistrtionHandlers = [
    {
      name: "Google",
      icon: FaGoogle,
      color: "text-red-500",
      handler: () => toast.info("Google Registration Coming Soon!"),
    },
    {
      name: "GitHub",
      icon: FaGithub,
      color: "text-gray-800",
      handler: () => toast.info("GitHub Registration Coming Soon!"),
    },
  ];

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] dark:bg-gradient-to-br dark:from-gray-900 dark:to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800/60 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to continue
          </p>
        </div>

        {isLoading && <Loader text="Authenticating…" showText={true} />}

        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="space-y-4">
            {inputFields.map((field) => (
              <div key={field.name} className="relative">
                <div
                  className={`flex items-center border ${
                    errors[field.name]
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } rounded-lg bg-gray-100 dark:bg-gray-800 p-2`}
                >
                  <div className="pl-4 text-gray-500 dark:text-gray-400">
                    <field.icon />
                  </div>
                  <input
                    type={
                      field.type === "password"
                        ? passwordVisibility
                          ? "text"
                          : "password"
                        : field.type
                    }
                    name={field.name}
                    placeholder={field.label}
                    className="w-full p-3 bg-transparent text-gray-900 dark:text-white focus:outline-none"
                  />
                  {field.type === "password" && (
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="pr-4 text-gray-500 dark:text-gray-400"
                    >
                      {passwordVisibility ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  )}
                </div>
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Forgot Password Link */}
          {/* <div className="text-right mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div> */}

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-700 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            <span className="mx-4 text-gray-500 dark:text-gray-400">Or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          </div>

          <div className="flex justify-center space-x-4">
            {socialRegistrtionHandlers.map((social) => (
              <button
                key={social.name}
                type="button"
                onClick={social.handler}
                className={`p-3 rounded-full bg-gray-200 dark:bg-gray-700 ${social.color} hover:bg-opacity-80 transition-colors duration-300`}
              >
                <social.icon size={24} />
              </button>
            ))}
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-400">
            Dont have an account?
            <Link
              to="/signup"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-purple-400 transition duration-300 underline-offset-4 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
