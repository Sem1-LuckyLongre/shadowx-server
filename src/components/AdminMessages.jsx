import { FiTrash2 } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { BiMessageRounded } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { Loader } from "./Loader";

export const AdminMessages = () => {
  const [messages, setMessages] = useState();
  const { URI, autherizedToken } = useTheme();
  const [deletingId, setDeletingId] = useState(null); // Track which message is being deleted

  const getMessages = async () => {
    try {
      const response = await fetch(`${URI}/api/admin/messages`, {
        method: "GET",
        headers: {
          Authorization: autherizedToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setMessages(data);
      } else {
        setMessages(data);
      }
    } catch (error) {
      toast.error("Failed To Fetch Messages!");
      console.log(error);
    }
  };

  const deleteMessage = async (id) => {
    setDeletingId(id); // Set the ID of the message being deleted
    try {
      const response = await fetch(`${URI}/api/admin/messages/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: autherizedToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setMessages(messages.filter((msg) => msg._id !== id));
        toast.success("Message deleted successfully");
      } else {
        toast.error(data.msg || "Failed to delete message");
      }
    } catch (error) {
      toast.error("Failed To Delete Message!");
      console.log(error);
    } finally {
      setDeletingId(null); // Reset the deleting ID regardless of success or failure
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="p-5 dark:bg-gray-900 flex flex-col items-center">
      {messages && (
        <>
          <h1 className="text-2xl font-bold text-black dark:text-white mb-5">
            Messages
          </h1>
          <div className="w-full max-w-3xl space-y-4">
            {messages.length > 0 ? (
              [...messages].reverse().map((msg) => (
                <div
                  key={msg._id}
                  className="dark:bg-gray-800 dark:text-gray-100 p-4 rounded-lg shadow-md border dark:border-gray-700 flex flex-col"
                >
                  <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-2">
                    <FiUser className="text-blue-400" size={20} />
                    <h2 className="text-lg font-semibold">
                      {msg.name}
                      <span className="text-red-500 font-extralight text-sm">
                        {msg.isAdmin ? " Admin" : ""}
                      </span>
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdOutlineEmail className="text-green-400" size={20} />
                    <p className="text-sm dark:text-gray-400">{msg.email}</p>
                  </div>
                  <div className="flex items-start gap-3 mt-2">
                    <BiMessageRounded className="text-yellow-400" size={20} />
                    <p className="dark:text-gray-300 text-gray-600">
                      {msg.message}
                    </p>
                  </div>
                  <button
                    className="mt-3 text-red-400 hover:text-red-500 self-end"
                    onClick={() => deleteMessage(msg._id)}
                    disabled={deletingId === msg._id} // Disable button while deleting
                  >
                    {deletingId === msg._id ? (
                      <Loader text="Removing..." showText={false} size={20} />
                    ) : (
                      <FiTrash2 size={20} />
                    )}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No messages yet.</p>
            )}
          </div>
        </>
      )}
      {!messages && <Loader text="Retrieving messages..." showText={true} />}
    </div>
  );
};
