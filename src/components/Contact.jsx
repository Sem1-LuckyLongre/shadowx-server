import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaUser,
  FaCommentAlt,
  FaDiscourse,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export const Contact = () => {
  const { URI } = useTheme();
  const { user } = useTheme();

  const validateForm = (formData) => {
    if (!formData.name.trim()) {
      toast.error("Full Name is required");
      return false;
    }
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      toast.error("Enter a valid email");
      return false;
    }
    if (!formData.phone.match(/^\d{10}$/)) {
      toast.error("Enter a valid 10-digit phone number");
      return false;
    }
    if (!formData.message.trim()) {
      toast.error("Message cannot be empty");
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formUserData = Object.fromEntries(formData.entries());

    if (!validateForm(formUserData)) return;

    try {
      const response = await fetch(`${URI}/api/form/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formUserData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg || "Message sent successfully!");
        event.target.reset();
      } else {
        toast.error(
          "Message not sent. Internal Server Error. Contact the developer."
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] dark:bg-gradient-to-br dark:from-gray-900 dark:to-black text-gray-900 dark:text-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold mb-4 text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600">
            Contact Us
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div className="bg-white dark:bg-gray-800/60 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-8">Contact Details</h2>
            <div className="space-y-6">
              {[
                {
                  icon: <FaEnvelope />,
                  title: "Email",
                  content: "longerlucky588@gmail.com",
                },
                {
                  icon: <FaPhone />,
                  title: "Phone",
                  content: "+91 9354326189",
                },
                {
                  icon: <FaMapMarkerAlt />,
                  title: "Address",
                  content:
                    "DUMMY ADDRESS: 123 Innovation Avenue, ShadowX, 54321",
                },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-xl"
                >
                  <div className="text-2xl text-blue-600">{contact.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600">
                      {contact.title}
                    </h3>
                    <p>{contact.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="bg-white dark:bg-gray-800/60 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {[
                {
                  name: "name",
                  label: "Full Name",
                  type: "text",
                  icon: <FaUser />,
                },
                {
                  name: "email",
                  label: "Email Address",
                  type: "email",
                  icon: <FaEnvelope />,
                },
                {
                  name: "phone",
                  label: "Phone Number",
                  type: "number",
                  icon: <FaDiscourse />,
                },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                    <span className="text-gray-400">{field.icon}</span>
                  </div>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.label}
                    defaultValue={user ? user.userData[field.name] : ""}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 text-gray-900 rounded-xl border"
                  />
                </div>
              ))}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 pt-3">
                  <FaCommentAlt className="text-gray-400" />
                </div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 text-gray-900 rounded-xl border"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl flex items-center justify-center"
              >
                <FaPaperPlane className="mr-2" /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
