// frontend/src/components/PostView.jsx
import React, { useEffect, useState } from "react";
import { getPost, addReply } from "../api/apiClient";
import ReplyForm from "./ReplyForm";

export default function PostView({ postId, refreshParent }) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
        // eslint-disable-next-line
    }, [postId]);

    async function load() {
        setLoading(true);
        try {
            const data = await getPost(postId);
            setPost(data);
        } catch (err) {
            console.error(err);
            alert("Failed to load post");
        } finally {
            setLoading(false);
        }
    }

    async function handleReply(reply) {
        try {
            await addReply(postId, reply);
            await load();
            refreshParent?.();
        } catch (err) {
            console.error(err);
            alert("Failed to post reply");
        }
    }

    if (loading) return <div className="text-sm text-gray-500">Loading...</div>;
    if (!post)
        return <div className="text-sm text-red-500">Post not found</div>;

    return (
        <div className="mt-3 p-3 bg-gray-50 rounded">
            <div className="mb-3">
                <div className="text-sm text-gray-700">{post.content}</div>
            </div>

            <div className="mb-3">
                <h4 className="text-sm font-semibold">
                    Replies ({post.replies?.length || 0})
                </h4>
                <div className="mt-2 space-y-2">
                    {post.replies && post.replies.length === 0 && (
                        <div className="text-sm text-gray-500">
                            No replies yet.
                        </div>
                    )}
                    {post.replies?.map((r, idx) => (
                        <div key={idx} className="p-2 bg-white border rounded">
                            <div className="text-sm text-gray-800">
                                {r.content}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {r.author || "Anonymous"} •{" "}
                                {new Date(r.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ReplyForm onReply={handleReply} />
        </div>
    );
}
