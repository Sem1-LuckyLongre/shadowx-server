const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg max-w-sm w-full transition-all duration-300 border border-blue-500">
        <h2 className="text-lg font-semibold text-white mb-4">Alert</h2>
        <p className="text-gray-300">{message}</p>
        <button 
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
