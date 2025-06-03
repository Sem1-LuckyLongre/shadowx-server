import { useState, useRef, useEffect } from "react";
import { FiSend, FiUser, FiLoader, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const mockMessages = [
  {
    id: 1,
    sender: "ai",
    text: "Hello! I'm your AI assistant. How can I help you today?",
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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: "ai",
        text: generateAIResponse(input),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const generateAIResponse = (userInput) => {
    const responses = [
      `I understand you're asking about "${userInput}". Our services include AI integration, chatbot development, and customer support solutions.`,
      `Regarding "${userInput}", we offer comprehensive support packages tailored to your business needs.`,
      `Thanks for your question about "${userInput}". Let me provide you with detailed information about our offerings.`,
      `"${userInput}" is a great question! We specialize in creating customized AI solutions for businesses like yours.`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex flex-col h-[70vh] md:h-[80vh] w-full max-w-full sm:max-w-xl mx-auto bg-gradient-to-br from-white/90 to-blue-50/90 dark:from-gray-800/90 dark:to-gray-900/90 rounded-2xl shadow-xl overflow-hidden border border-blue-100/50 dark:border-gray-700/50 backdrop-blur-sm">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-gray-900 dark:to-gray-800 border-b border-blue-200/30 dark:border-gray-700/50"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5,
          }}
          className="relative"
        >
          <div className="bg-white text-blue-600 rounded-full p-2">
            <FiUser size={22} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
        </motion.div>
        <div>
          <div className="font-semibold text-base text-white">AI Assistant</div>
          <div className="text-xs text-blue-100 dark:text-blue-300 flex items-center gap-1">
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              •
            </motion.span>
            {isTyping ? "Typing..." : "Online"}
          </div>
        </div>
      </motion.div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-transparent to-blue-50/30 dark:to-gray-900/30">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3,
              }}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative max-w-[80vw] sm:max-w-xs px-4 py-3 rounded-2xl text-sm break-words shadow-sm
                  ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-none"
                      : "bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
                  }`}
              >
                {msg.sender === "ai" ? (
                  <TypeAnimation
                    sequence={[msg.text]}
                    wrapper="div"
                    cursor={false}
                    speed={70}
                    style={{ fontSize: "14px" }}
                  />
                ) : (
                  <div>{msg.text}</div>
                )}
                <div
                  className={`text-[10px] mt-1 opacity-70 flex items-center justify-end gap-1
                  ${
                    msg.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {msg.time}
                  {msg.sender === "user" && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xs"
                    >
                      <FiCheck />
                    </motion.span>
                  )}
                </div>

                {/* Decorative elements */}
                {msg.sender === "ai" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -left-1.5 top-0 w-3 h-3 bg-gray-100 dark:bg-gray-700 rotate-45"
                  />
                )}
                {msg.sender === "user" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1.5 top-0 w-3 h-3 bg-blue-500 rotate-45"
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-2xl rounded-bl-none">
              <div className="flex space-x-1">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSend}
        className="px-4 py-3 bg-white/80 dark:bg-gray-800/80 border-t border-blue-100/50 dark:border-gray-700/50 backdrop-blur-sm"
      >
        <motion.div
          whileFocus={{ scale: 1.01 }}
          className="flex items-center gap-2 bg-blue-50/70 dark:bg-gray-700/70 rounded-full px-4 py-2 border border-blue-200/50 dark:border-gray-600/50"
        >
          <input
            type="text"
            className="flex-1 bg-transparent text-gray-900 dark:text-white focus:outline-none placeholder-blue-300 dark:placeholder-gray-500 text-sm"
            placeholder="Message AI assistant..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className={`rounded-full p-2 ${
              input.trim()
                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
            }`}
            aria-label="Send"
            disabled={!input.trim()}
          >
            {isTyping ? <FiLoader className="animate-spin" /> : <FiSend />}
          </motion.button>
        </motion.div>
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2"
        >
          AI assistant may produce inaccurate information
        </motion.p>
      </motion.form>
    </div>
  );
}
