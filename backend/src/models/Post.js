// backend/src/models/Post.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const ReplySchema = new Schema({
    author: { type: String, default: "Anonymous" },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    votes: { type: Number, default: 0 },
    replies: [ReplySchema],
    answered: { type: Boolean, default: false },
    author: { type: String, default: "Anonymous" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", PostSchema);
