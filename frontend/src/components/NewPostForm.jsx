// frontend/src/components/NewPostForm.jsx
import React, { useState } from "react";
import { createPost } from "../api/apiClient";

export default function NewPostForm({ onCreated }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [saving, setSaving] = useState(false);

    async function submit(e) {
        e.preventDefault();
        if (!title.trim() || !content.trim())
            return alert("Please enter title and content");
        setSaving(true);
        try {
            await createPost({
                title: title.trim(),
                content: content.trim(),
                author: "Anonymous",
            });
            setTitle("");
            setContent("");
            onCreated?.();
        } catch (err) {
            console.error(err);
            alert("Failed to create post");
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={submit} className="p-4 bg-white rounded shadow-sm">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
                className="w-full mb-2 p-2 border rounded"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your question or message..."
                className="w-full mb-2 p-2 border rounded"
                rows={4}
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    disabled={saving}
                >
                    {saving ? "Posting..." : "Post"}
                </button>
            </div>
        </form>
    );
}
