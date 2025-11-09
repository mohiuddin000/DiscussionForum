// frontend/src/api/apiClient.js
const BASE = " https://discussionforum-vfqc.onrender.com";

async function request(path, options = {}) {
    const res = await fetch(`${BASE}${path}`, options);
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed: ${res.status} ${text}`);
    }
    return res.json();
}

export function fetchPosts(sort) {
    const query = sort ? `?sort=${sort}` : "";
    return request(`/posts${query}`);
}

export function createPost(data) {
    return request("/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

export function getPost(id) {
    return request(`/posts/${id}`);
}

export function addReply(id, reply) {
    return request(`/posts/${id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reply),
    });
}

export function upvotePost(id) {
    return request(`/posts/${id}/upvote`, { method: "POST" });
}
