import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LockClosedIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Loader } from "./Loader";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [name, setName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const UserData = JSON.parse(localStorage.getItem("User_Data"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setShowLoader(true); // Show loader

    setTimeout(() => {
      setShowLoader(false); // Hide loader
      setIsLoading(false);
      
      if (email !== UserData.email) {
        setError(
          "Unfortunately, the Email Address you entered is not found in our Database"
        );
        return;
      }

      // Check if passkey is set
      if (!UserData.passkey) {
        setError("No passkey is set for this account.");
        return;
      }

      setShowNameModal(true);
    }, 2000);
  };

  const handleNameSubmit = () => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      if (name === UserData.passkey) {
        setShowLoader(true);
        setTimeout(() => {
          setShowLoader(false);
          setShowNameModal(false);
          setShowCredentialsModal(true);
        }, 1000);
      } else {
        setError("PASSKEY does not match. Please try again.");
      }
    }, 1200);
  };

  const handleLoginRedirect = () => {
    localStorage.setItem("LoggedIn", true);
    window.location.assign("/");
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-gray-50 dark:bg-gray-900 py-10 px-6 shadow-2xl rounded-xl border-2 border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <LockClosedIcon className="mx-auto h-12 w-12 text-indigo-400" />
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
              Forgot Password
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Enter your email to reset your password
            </p>
          </div>
          <div className="flex justify-center items-center w-full">
            {showLoader ? <Loader /> : ""}
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center text-red-400 ">
                <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            {success && <div className="text-green-400 text-sm">{success}</div>}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isLoading ? "Sending..." : "Reset Password"}
              </button>
            </div>
          </form>

          {showNameModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out scale-95 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-center items-center w-full">
                  {showLoader ? <Loader /> : ""}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  What is your PASSKEY?
                </h3>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your PASSKEY"
                />
                <button
                  onClick={handleNameSubmit}
                  className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                >
                  Submit
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
            </div>
          )}

          {showCredentialsModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out scale-95 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Your Credentials
                </h3>
                <p className="mt-2 text-gray-900 dark:text-white">
                  Email: {UserData.email}
                </p>
                <p className="mt-2 text-gray-900 dark:text-white">
                  Password: {UserData.password}
                </p>
                <button
                  onClick={handleLoginRedirect}
                  className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                >
                  Login to Your Account
                </button>
                <button
                  onClick={() => setShowCredentialsModal(false)}
                  className="mt-2 w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                  Remember your password?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/SignIn"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
