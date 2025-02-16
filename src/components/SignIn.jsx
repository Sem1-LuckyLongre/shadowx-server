import React, { useState, useRef, useEffect } from "react";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaGithub,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "./Loader";

export const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const Registrtion = localStorage.getItem("Registration");
    if (!Registrtion) {
      navigate("/SignUp");
      return;
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const formRef = useRef(null);

  const inputFields = [
    {
      label: "Email Address",
      type: "email",
      name: "email",
      icon: FaEnvelope,
      validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      icon: FaLock,
      validation: (value) => value.length >= 8,
    },
  ];

  const validateForm = () => {
    const storedUserData = JSON.parse(localStorage.getItem("User_Data"));

    if (!storedUserData) {
      setError("No registered user found. Please sign up first.");
      return false;
    }

    if (
      formData.email !== storedUserData.email ||
      formData.password !== storedUserData.password
    ) {
      setError("Invalid email or password");
      setTimeout(() => {
        setError("");
      }, 4000);
      return false;
    }

    setError("");
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true); // Start loading

    setTimeout(() => {
      setIsLoading(false);
      if (validateForm()) {
        setIsSubmitted(true);
        localStorage.setItem("LoggedIn", "true");

        setTimeout(() => {
          setIsSubmitted(false);
          window.location.assign("/");
        }, 2000);
      }
    }, 2000);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const socialRegistrtionHandlers = [
    {
      name: "Google",
      icon: FaGoogle,
      color: "text-red-500",
      handler: () => {
        // Implement Google OAuth
        alert("Google Registrtion Coming Soon!");
      },
    },
    {
      name: "GitHub",
      icon: FaGithub,
      color: "text-gray-800",
      handler: () => {
        // Implement GitHub OAuth
        alert("GitHub Registrtion Coming Soon!");
      },
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

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center mb-4">
            <Loader />
          </div>
        )}

        {/* Success Message */}
        {isSubmitted && (
          <div className="bg-green-600/80 text-white p-4 rounded-lg flex items-center justify-center mb-4">
            <FaCheckCircle className="mr-2" />
            Registrtion Successful!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-600/80 text-white p-4 rounded-lg text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} ref={formRef}>
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
                        ? passwordVisibility
                          ? "text"
                          : "password"
                        : field.type
                    }
                    name={field.name}
                    placeholder={field.label}
                    value={formData[field.name]}
                    onChange={handleInputChange}
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
              </div>
            ))}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-700 text-white py-3 rounded-lg shadow-lg transition-transform duration-300"
          >
            Sign In
          </button>
          <h1 className="text-center my-5">Or</h1>
          {/* Social Registrtion */}
          <div className="mt-6">
            <div className="flex items-center justify-center space-x-4">
              {socialRegistrtionHandlers.map((social) => (
                <button
                  key={social.name}
                  type="button"
                  onClick={social.handler}
                  className={`p-3 rounded-full bg-gray-200 dark:bg-gray-700 ${social.color} hover:bg-opacity-80`}
                >
                  <social.icon size={24} />
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
