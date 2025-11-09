// frontend/src/App.jsx
import React, { useState } from "react";
import PostsList from "./components/PostsList";
import NewPostForm from "./components/NewPostForm";

export default function App() {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">
                    Learnato — Discussion Forum
                </h1>
                <p className="text-sm text-gray-600">
                    Ask questions, reply, and upvote useful posts.
                </p>
            </header>

            <section className="mb-6">
                <NewPostForm onCreated={() => setRefreshKey((k) => k + 1)} />
            </section>

            <section>
                <PostsList key={refreshKey} />
            </section>
        </div>
    );
}
