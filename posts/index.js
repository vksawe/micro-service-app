const express = require("express");
const { randomBytes } = require("crypto");
const cors=require('cors')
const app = express();
app.use(cors())
app.use(express.json());
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  console.log(req.body)
  const { title } = req.body;
  posts[id] = { id, title };
  res.status(201).send(posts[id]);
});

app.listen(4002, () => {
  console.log("Listening on port 4002");
});
