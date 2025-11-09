// frontend/src/components/UpvoteButton.jsx
import React from "react";

export default function UpvoteButton({ votes = 0, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="px-3 py-1 rounded bg-gray-100"
        >
            ▲ {votes}
        </button>
    );
}
