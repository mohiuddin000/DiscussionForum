// backend/src/routes/posts.js
import express from "express";
import {
    addReply,
    createPost,
    getAllPosts,
    getPost,
    markAnswered,
    upvote,
} from "../controllers/postControllers.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/:id/reply", addReply);
router.post("/:id/upvote", upvote);
router.post("/:id/markAnswered", markAnswered); // optional

export default router;
