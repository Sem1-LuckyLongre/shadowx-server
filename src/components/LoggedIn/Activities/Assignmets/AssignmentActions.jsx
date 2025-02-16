import React from "react";

const AssignmentActions = ({ assignment, onToggleStatus, onDelete }) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
      <button
        className={`px-4 py-2 text-white font-medium rounded-lg transition ${
          assignment.status === "done"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-yellow-600 hover:bg-yellow-700"
        }`}
        onClick={() => onToggleStatus(assignment.id)}
      >
        {assignment.status === "done" ? "✔ Done" : "❌ Undone"}
      </button>

      <button
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
        onClick={() => onDelete(assignment.id)}
      >
        🗑 Delete
      </button>
    </div>
  );
};

export default AssignmentActions;
