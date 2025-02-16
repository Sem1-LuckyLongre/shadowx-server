import React from 'react';

const PracticalActions = ({ practical, toggleStatus, deletePractical }) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
      <button
        className={`px-4 py-2 text-white font-medium rounded-lg transition ${
          practical.status === "done"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-yellow-600 hover:bg-yellow-700"
        }`}
        onClick={() => toggleStatus(practical.id)}
      >
        {practical.status === "done" ? "✔ Done" : "❌ Undone"}
      </button>

      <button
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
        onClick={() => deletePractical(practical.id)}
      >
        🗑 Delete
      </button>
    </div>
  );
};

export default PracticalActions;
