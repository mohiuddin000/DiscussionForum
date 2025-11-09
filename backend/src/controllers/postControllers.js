// backend/src/controllers/postsController.js

import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        if (!title || !content)
            return res
                .status(400)
                .json({ message: "Title and content required" });
        const post = new Post({ title, content, author });
        await post.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const sort =
            req.query.sort === "votes"
                ? { votes: -1, createdAt: -1 }
                : { createdAt: -1 };
        const posts = await Post.find().sort(sort).lean();
        return res.json(posts);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean();
        if (!post) return res.status(404).json({ message: "Not found" });
        return res.json(post);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const addReply = async (req, res) => {
    try {
        const { content, author } = req.body;
        if (!content)
            return res.status(400).json({ message: "Reply content required" });
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Not found" });
        post.replies.push({ content, author });
        await post.save();
        return res.json(post);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const upvote = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { votes: 1 } },
            { new: true }
        ).lean();
        if (!post) return res.status(404).json({ message: "Not found" });
        return res.json({ votes: post.votes });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const markAnswered = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { answered: true },
            { new: true }
        );
        if (!post) return res.status(404).json({ message: "Not found" });
        return res.json(post);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
