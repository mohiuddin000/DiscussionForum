// frontend/src/components/ReplyForm.jsx
import React, { useState } from "react";

export default function ReplyForm({ onReply }) {
    const [content, setContent] = useState("");
    const [saving, setSaving] = useState(false);

    async function submit(e) {
        e.preventDefault();
        if (!content.trim()) return alert("Reply cannot be empty");
        setSaving(true);
        try {
            await onReply({ content: content.trim(), author: "Anonymous" });
            setContent("");
        } catch (err) {
            console.error(err);
            alert("Failed to send reply");
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={submit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a reply..."
                className="w-full p-2 border rounded mb-2"
                rows={3}
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-3 py-1 rounded bg-blue-600 text-white"
                    disabled={saving}
                >
                    {saving ? "Sending..." : "Reply"}
                </button>
            </div>
        </form>
    );
}
