import { useState, useRef, useEffect, useCallback } from "react";
import { FiSend, FiUser, FiLoader } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const initialMessages = [
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
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("online");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Simulate admin response
  const simulateAdminResponse = useCallback(() => {
    setIsSending(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "admin",
          text: "Thanks for your message! Our team will get back to you shortly.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsSending(false);
    }, 1500);
  }, []);

  const handleSend = useCallback((e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isSending) return;
    
    // Add user message
    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: trimmedInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    
    // Simulate admin typing indicator
    setIsSending(true);
    
    // Simulate admin response after a delay
    setTimeout(simulateAdminResponse, 1000);
  }, [input, isSending, messages.length, simulateAdminResponse]);

  // Handle connection status changes
  useEffect(() => {
    const handleOnline = () => setConnectionStatus("online");
    const handleOffline = () => setConnectionStatus("offline");
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="flex flex-col h-[70vh] md:h-[80vh] max-w-2xl mx-auto bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-blue-100 dark:border-gray-700">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 px-6 py-4 bg-blue-600 dark:bg-blue-800 text-white shadow relative"
      >
        <div className="bg-white/20 rounded-full p-2">
          <FiUser size={28} />
        </div>
        <div className="flex-1">
          <div className="font-bold text-lg">Admin Support</div>
          <div className="flex items-center gap-1 text-xs">
            <span className={`inline-block w-2 h-2 rounded-full ${
              connectionStatus === "online" ? "bg-green-400" : "bg-red-400"
            }`}></span>
            <span className="text-blue-100 capitalize">{connectionStatus}</span>
          </div>
        </div>
        <button 
          className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition"
          onClick={scrollToBottom}
        >
          Scroll to Bottom
        </button>
      </motion.div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 bg-transparent">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-md text-sm
                  ${msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                  }`}
              >
                <div>{msg.text}</div>
                <div className="text-[10px] text-right opacity-60 mt-1">
                  {msg.time}
                  {msg.sender === "user" && (
                    <span className="ml-1">
                      {msg.id === messages.length && isSending ? (
                        <FiLoader className="inline animate-spin" size={10} />
                      ) : (
                        <span className="inline-block w-2 h-2 rounded-full bg-white/50"></span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isSending && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-md text-sm bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-t border-blue-100 dark:border-gray-700"
      >
        <input
          type="text"
          className="flex-1 rounded-full px-4 py-2 bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-70"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSending}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className={`rounded-full p-3 shadow transition ${
            isSending 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          aria-label="Send"
          disabled={isSending}
        >
          {isSending ? <FiLoader className="animate-spin" size={20} /> : <FiSend size={20} />}
        </motion.button>
      </form>
    </div>
  );
}