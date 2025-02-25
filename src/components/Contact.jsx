import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaUser,
  FaCommentAlt,
  FaSlack,
  FaDiscord,
  FaTwitter,
} from "react-icons/fa";

export const Contact = () => {
  const handleFormSubmit = (formData) => {
    const formUserData = Object.fromEntries(formData.entries());
    console.log(formUserData);
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
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Have a question, suggestion, or just want to say hello? We're here
            to help you connect and provide the best support possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600">
              Contact Details
            </h2>

            <div className="space-y-6">
              {[
                {
                  icon: (
                    <FaEnvelope className="text-blue-600 dark:text-blue-400" />
                  ),
                  title: "Email",
                  content: "longerlucky588@gmail.com",
                },
                {
                  icon: (
                    <FaPhone className="text-blue-600 dark:text-blue-400" />
                  ),
                  title: "Phone",
                  content: "+91 9354326189",
                },
                {
                  icon: (
                    <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400" />
                  ),
                  title: "Address",
                  content:
                    "DUMMY ADDRESS:- 123 Innovation Avenue, ShadowX, 54321",
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-all"
                >
                  <div className="text-2xl">{contact.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300">
                      {contact.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {contact.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Connect */}
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600">
                Connect Socially
              </h3>
              <div className="flex space-x-6 justify-center">
                {[
                  { icon: <FaSlack />, color: "text-purple-500" },
                  { icon: <FaDiscord />, color: "text-indigo-500" },
                  { icon: <FaTwitter />, color: "text-blue-500" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.2 }}
                    className={`text-3xl ${social.color} hover:opacity-80 transition-all`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600">
              Send us a Message
            </h2>

            <form action={handleFormSubmit} className="space-y-6">
              {[
                {
                  name: "name",
                  label: "Full Name",
                  type: "text",
                  icon: <FaUser />,
                  required: true,
                },
                {
                  name: "email",
                  label: "Email Address",
                  type: "email",
                  icon: <FaEnvelope />,
                  required: true,
                },
                {
                  name: "phone",
                  label: "Phone Number",
                  type: "number",
                  icon: <FaPhone />,
                  required: false,
                },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 dark:text-gray-500">
                      {field.icon}
                    </span>
                  </div>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.label}
                    required={field.required}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-gray-200 dark:border-gray-600"
                  />
                </div>
              ))}

              {/* Message Textarea */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 pt-3 pointer-events-none">
                  <FaCommentAlt className="text-gray-400 dark:text-gray-500" />
                </div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-gray-200 dark:border-gray-600"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2"
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
