import { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaIdCard,
  FaGraduationCap,
  FaBuilding,
  FaEnvelope,
  FaSave,
  FaTimes,
  FaKey,
  FaPhone,
} from "react-icons/fa";
import Modal from "../common/Modal";
import { Loader } from "../Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const {userAuthentication} = useTheme();
// toast.configure();

export const EditProfile = () => {
  let navigate = useNavigate();
  // const { userAuthentication } = useTheme();
  const { isLoggedIn, user, URI, autherizedToken } = useTheme();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/SignIn");
      return;
    }
  }, []);

  const inputFields = [
    { label: "Name", name: "name", icon: FaUser, type: "text", minLength: 3 },
    { label: "Roll Number", name: "rollNo", type: "number", icon: FaIdCard },
    {
      label: "Phone Number",
      name: "phone",
      type: "number",
      icon: FaPhone,
      length: 10,
    },
    {
      label: "Course",
      name: "course",
      icon: FaGraduationCap,
      type: "text",
      minLength: 5,
    },
    {
      label: "Department",
      name: "department",
      icon: FaBuilding,
      type: "text",
      minLength: 5,
    },
    { label: "Email", name: "email", icon: FaEnvelope, type: "email" },
    {
      label: "Pass Key",
      name: "passkey",
      icon: FaKey,
      type: "text",
      minLength: 3,
    },
  ];

  const validateField = (name, value) => {
    if (value === "") return true;
    if (
      name === "email" &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      )
    ) {
      toast.error("Invalid email format");
      return false;
    }
    if (name === "rollNo" && value.length != 8) {
      toast.error("Roll Number must be 8 digit number");
      return false;
    }
    if (name === "phone" && !/^[0-9]{10}$/.test(value)) {
      toast.error("Phone Number must be exactly 10 digits");
      return false;
    }
    if ((name === "name" || name === "passKey") && value.length < 3) {
      toast.error(
        `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } must be at least 3 characters long`
      );
      return false;
    }
    if ((name === "course" || name === "department") && value.length < 5) {
      toast.error(
        `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } must be at least 5 characters long`
      );
      return false;
    }
    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formUserData = Object.fromEntries(formData.entries());
    let validatedData = {};

    for (let field of inputFields) {
      if (!validateField(field.name, formUserData[field.name])) {
        return;
      }
      validatedData[field.name] = formUserData[field.name];
    }

    console.log("Validated Data:", validatedData);
    // toast.success("Profile updated successfully!");

    try {
      const response = await fetch(`${URI}/api/auth/user/profile/edit`, {
        method: "PATCH",
        body: JSON.stringify(validatedData),
        headers: {
          Authorization: autherizedToken,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("updated", data);
        // setUser(data);
        toast.success("Updated Successfully");
        // userAuthentication();
        window.location.assign("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <>
        {!user && <Loader />}
        {user && (
          <>
            <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex justify-between items-center shadow-lg text-white">
              <h1 className="text-3xl font-bold">Edit Profile</h1>
              <button
                onClick={handleCancel}
                className="flex items-center bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
            </header>

            <div className="container mx-auto px-4 py-8">
              <form
                onSubmit={handleSave}
                className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  Your Details
                </h2>

                <div className="space-y-6">
                  {inputFields.map((field) => (
                    <div key={field.name} className="relative">
                      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                        <div className="pl-4 text-gray-500 dark:text-gray-400">
                          <field.icon className="h-6 w-6 mr-2" />
                        </div>

                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.label}
                          defaultValue={user?.userData[field.name] || ""}
                          disabled={field.type === "email"}
                          className="w-full p-3 bg-transparent text-gray-900 dark:text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-green-700 flex items-center hover:from-green-400 hover:to-green-600 text-white py-2 px-4 rounded-lg transition duration-300"
                  >
                    <FaSave className="mr-2" /> Save Changes
                  </button>
                </div>
              </form>
            </div>

            <Modal
              isOpen={false}
              onClose={() => {}}
              message="Contact the Developer for changes."
            />
          </>
        )}
      </>
    </div>
  );
};
