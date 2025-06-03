import { useState, useRef, useEffect } from "react";
import { FiSend, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

const mockMessages = [
  {
    id: 1,
    sender: "admin",
    text: "Hello! How can I help you today?",
    time: "09:00 AM",
  },
  {
    id: 2,
    sender: "user",
    text: "Hi, I need some information about your services.",
    time: "09:01 AM",
  },
];

export default function AdminChat() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "user",
        text: input,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[70vh] md:h-[80vh] max-w-2xl mx-auto bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-blue-100 dark:border-gray-700">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 px-6 py-4 bg-blue-600 dark:bg-blue-800 text-white shadow"
      >
        <div className="bg-white/20 rounded-full p-2">
          <FiUser size={28} />
        </div>
        <div>
          <div className="font-bold text-lg">Admin Support</div>
          <div className="text-xs text-blue-100">Online</div>
        </div>
      </motion.div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 bg-transparent">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: msg.id * 0.05 }}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-md text-sm
                ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                }`}
            >
              <div>{msg.text}</div>
              <div className="text-[10px] text-right opacity-60 mt-1">
                {msg.time}
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-t border-blue-100 dark:border-gray-700"
      >
        <input
          type="text"
          className="flex-1 rounded-full px-4 py-2 bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow transition"
          aria-label="Send"
        >
          <FiSend size={20} />
        </motion.button>
      </form>
    </div>
  );
}
