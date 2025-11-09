// backend/src/app.js
import express from "express";
import cors from "cors";
import postsRouter from "./routes/posts.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", postsRouter);

app.get("/", (req, res) => res.send("Learnato Forum API"));

export default app;
