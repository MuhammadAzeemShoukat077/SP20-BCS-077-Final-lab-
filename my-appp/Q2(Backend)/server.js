const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
import Post from "../models/posts-model";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const connection_url =
  "mongodb+srv://azeem:abcd1234@cluster0.ozc1vi9.mongodb.net/?retryWrites=true&w=majority";
app.get("/posts", async (req, res) => {
  let posts;
  try {
    posts = await Post.find().limit(30);
  } catch (error) {
    return console.log(error);
  }
  if (!posts) {
    return res.status(404).json({ message: "No Posts Found" });
  }
  return res.status(200).json({ posts });
});

app.get("/posts/limit=:lim/skip=:sk", async (req, res) => {
  const lim = req.params.lim;
  const sk = req.params.sk;
  let posts;
  try {
    posts = await Post.find().skip(sk).limit(lim);
  } catch (error) {
    return console.log(error);
  }
  if (!posts) {
    return res.status(404).json({ message: "No Posts Found" });
  }
  return res.status(200).json({ posts });
});

app.post("/posts/add", async (req, res) => {
  const { title, body, userId } = req.body;
  const newPost = new Post({
    title,
    body,
    userId,
  });
  try {
    await newPost.save();
  } catch (error) {
    return res.status(500).json({ error });
  }
  return res.status(201).json({ newPost });
});

mongoose
  .connect(connection_url)
  .then(() => console.log("successfully connected!"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`listening on localhost: ${port}`));
