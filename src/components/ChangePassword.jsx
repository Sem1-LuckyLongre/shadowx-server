import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import { Loader } from "./Loader";

export const ChangePassword = () => {
  const { autherizedToken, URI, userAuthentication } = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  useEffect(() => {
    // Validate new password in real-time
    if (formData.newPassword) {
      setPasswordChecks({
        length: formData.newPassword.length >= 8,
        uppercase: /[A-Z]/.test(formData.newPassword),
        lowercase: /[a-z]/.test(formData.newPassword),
        number: /[0-9]/.test(formData.newPassword),
        special: /[@$!%*?&]/.test(formData.newPassword),
      });
    }

    // Validate password match in real-time
    if (formData.confirmPassword && formData.newPassword) {
      if (formData.confirmPassword !== formData.newPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "",
        }));
      }
    }
  }, [formData.newPassword, formData.confirmPassword]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validate current password
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    // Validate new password
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (!passwordPattern.test(formData.newPassword)) {
      newErrors.newPassword = "Password must meet all requirements";
      isValid = false;
    }

    // Validate confirm password
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your new password";
      isValid = false;
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${URI}/api/auth/user/profile/change-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: autherizedToken,
            },
            body: JSON.stringify({
              currentPassword: formData.currentPassword,
              newPassword: formData.newPassword,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          if (data.message === "Previous Password in Incorrect!") {
            toast.error(data.message);
          } else {
            toast.success(data.message);
            userAuthentication();
            setFormData({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
          }
          setIsLoading(false);
        } else {
          toast.error(data.message || "Failed to change password");
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error changing password:", error);
        toast.error("Internal server error. Please try again later.");
        setIsLoading(false);
      }
    }
  };

  const getCheckClassName = (isValid) =>
    `text-xs flex items-center ${
      isValid
        ? "text-green-500 dark:text-green-400"
        : "text-gray-600 dark:text-gray-500"
    }`;

  return (
    <div className="bg-gray-50 dark:bg-dark-900 text-gray-800 dark:text-gray-100 min-h-screen">
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700">
            <h2 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
              Change Your Password
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                  >
                    Current Password
                  </label>
                  <div
                    className={`input-field bg-gray-100 dark:bg-dark-700 rounded-lg border ${
                      errors.currentPassword
                        ? "border-red-500"
                        : "border-gray-300 dark:border-dark-600"
                    } focus-within:border-primary-500 transition-all relative`}
                  >
                    <input
                      type={showPassword.currentPassword ? "text" : "password"}
                      name="currentPassword"
                      id="currentPassword"
                      className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
                      placeholder="Enter current password"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 hover:text-primary-500"
                      onClick={() =>
                        togglePasswordVisibility("currentPassword")
                      }
                    >
                      <i
                        className={`far ${
                          showPassword.currentPassword
                            ? "fa-eye-slash"
                            : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                  >
                    New Password
                  </label>
                  <div
                    className={`input-field bg-gray-100 dark:bg-dark-700 rounded-lg border ${
                      errors.newPassword
                        ? "border-red-500"
                        : "border-gray-300 dark:border-dark-600"
                    } focus-within:border-primary-500 transition-all relative`}
                  >
                    <input
                      type={showPassword.newPassword ? "text" : "password"}
                      name="newPassword"
                      id="newPassword"
                      className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
                      placeholder="Enter new password"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 hover:text-primary-500"
                      onClick={() => togglePasswordVisibility("newPassword")}
                    >
                      <i
                        className={`far ${
                          showPassword.newPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.newPassword}
                    </p>
                  )}
                  <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">
                    Must be at least 8 characters long with at least one
                    uppercase, one lowercase, one number and one special
                    character
                  </p>
                  <div className="mt-2 space-y-1">
                    <p
                      className={getCheckClassName(passwordChecks.length)}
                      id="lengthCheck"
                    >
                      <i
                        className="fas fa-circle mr-2"
                        style={{ fontSize: "6px" }}
                      ></i>
                      At least 8 characters
                    </p>
                    <p
                      className={getCheckClassName(passwordChecks.uppercase)}
                      id="uppercaseCheck"
                    >
                      <i
                        className="fas fa-circle mr-2"
                        style={{ fontSize: "6px" }}
                      ></i>
                      At least one uppercase letter
                    </p>
                    <p
                      className={getCheckClassName(passwordChecks.lowercase)}
                      id="lowercaseCheck"
                    >
                      <i
                        className="fas fa-circle mr-2"
                        style={{ fontSize: "6px" }}
                      ></i>
                      At least one lowercase letter
                    </p>
                    <p
                      className={getCheckClassName(passwordChecks.number)}
                      id="numberCheck"
                    >
                      <i
                        className="fas fa-circle mr-2"
                        style={{ fontSize: "6px" }}
                      ></i>
                      At least one number
                    </p>
                    <p
                      className={getCheckClassName(passwordChecks.special)}
                      id="specialCheck"
                    >
                      <i
                        className="fas fa-circle mr-2"
                        style={{ fontSize: "6px" }}
                      ></i>
                      At least one special character
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                  >
                    Confirm New Password
                  </label>
                  <div
                    className={`input-field bg-gray-100 dark:bg-dark-700 rounded-lg border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : formData.confirmPassword &&
                          formData.confirmPassword === formData.newPassword
                        ? "border-green-500"
                        : "border-gray-300 dark:border-dark-600"
                    } focus-within:border-primary-500 transition-all relative`}
                  >
                    <input
                      type={showPassword.confirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 hover:text-primary-500"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    >
                      <i
                        className={`far ${
                          showPassword.confirmPassword
                            ? "fa-eye-slash"
                            : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-200 dark:border-dark-700 gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  <i className="fas fa-save mr-2"></i> Update Password
                </button>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              {isLoading && <Loader />}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
