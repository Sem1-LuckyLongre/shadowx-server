import { useState, useRef } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGraduationCap,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Loader } from "./Loader";

export const SignUp = () => {
  if(localStorage.getItem("Registration")){
    window.location.assign("/")
  }
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const formRef = useRef(null);

  const inputFields = [
    {
      label: "Full Name",
      type: "text",
      name: "name",
      icon: FaUser,
      validation: (value) => value.length >= 4,
    },
    {
      label: "Course",
      type: "text",
      name: "course",
      icon: FaGraduationCap,
      validation: (value) => value.length >= 3,
    },
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
      validation: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        ),
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      icon: FaLock,
      validation: (value) => value === formData.password,
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    inputFields.forEach((field) => {
      if (!formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      } else if (!field.validation(formData[field.name])) {
        switch (field.name) {
          case "name":
            newErrors[field.name] = "Name must be at least 4 characters";
            break;
          case "course":
            newErrors[field.name] = "Course must be at least 3 characters";
            break;
          case "email":
            newErrors[field.name] = "Invalid email format";
            break;
          case "password":
            newErrors[field.name] =
              "Password must be 8 character long strong (uppercase, lowercase, number, special char)";
            break;
          case "confirmPassword":
            newErrors[field.name] = "Passwords do not match";
            break;
          default:
            break;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);

        // Store user data
        localStorage.setItem("Registration", "true");
        localStorage.setItem("User_Data", JSON.stringify(formData));

        // Reset and redirect
        setTimeout(() => {
          setIsSubmitted(false);
          window.location.assign("/");
        }, 2000);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] py-5 dark:bg-gradient-to-br dark:from-gray-900 dark:to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800/60 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Join our community today!</p>
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
            Registration Successful!
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
  type={field.type === "password" ? (passwordVisibility[field.name] ? "text" : "password") : field.type}
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
                      {passwordVisibility[field.name] ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  )}
                </div>
                {errors[field.name] && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1 pl-4">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-700 text-white py-3 rounded-lg shadow-lg transition-transform duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
