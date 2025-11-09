// frontend/src/components/PostsList.jsx
import React, { useEffect, useState } from "react";
import { fetchPosts, upvotePost } from "../api/apiClient";
import PostView from "./PostView";

export default function PostsList() {
    const [posts, setPosts] = useState([]);
    const [sort, setSort] = useState("date");
    const [activePostId, setActivePostId] = useState(null);

    useEffect(() => {
        load();
    }, [sort]);

    async function load() {
        try {
            const data = await fetchPosts(
                sort === "votes" ? "votes" : undefined
            );
            setPosts(data);
        } catch (err) {
            console.error(err);
            alert("Failed to load posts");
        }
    }

    async function handleUpvote(id) {
        try {
            await upvotePost(id);
            load();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <div className="flex gap-2 mb-4">
                <button
                    className={`px-3 py-1 rounded ${
                        sort === "date"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200"
                    }`}
                    onClick={() => setSort("date")}
                >
                    Newest
                </button>
                <button
                    className={`px-3 py-1 rounded ${
                        sort === "votes"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200"
                    }`}
                    onClick={() => setSort("votes")}
                >
                    Top
                </button>
            </div>

            <ul>
                {posts.length === 0 && (
                    <li className="text-gray-500">
                        No posts yet — be the first!
                    </li>
                )}
                {posts.map((p) => (
                    <li
                        key={p._id}
                        className="p-4 border rounded mb-3 bg-white shadow-sm"
                    >
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {p.title}
                                </h3>
                                <p className="text-sm text-gray-700 mt-1">
                                    {p.content.length > 200
                                        ? `${p.content.slice(0, 200)}...`
                                        : p.content}
                                </p>
                                <div className="text-xs text-gray-500 mt-2">
                                    Replies: {p.replies?.length || 0} •{" "}
                                    {new Date(p.createdAt).toLocaleString()}
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <button
                                    className="px-3 py-1 rounded bg-gray-100"
                                    onClick={() => handleUpvote(p._id)}
                                >
                                    ▲ {p.votes}
                                </button>
                                <button
                                    className="text-sm mt-2 text-blue-600"
                                    onClick={() =>
                                        setActivePostId((id) =>
                                            id === p._id ? null : p._id
                                        )
                                    }
                                >
                                    {activePostId === p._id ? "Hide" : "View"}
                                </button>
                            </div>
                        </div>

                        {activePostId === p._id && (
                            <div className="mt-4">
                                <PostView postId={p._id} refreshParent={load} />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
