const express = require("express");
const { randomBytes } = require("crypto");
const cors=require('cors')
const app = express();
app.use(express.json());
app.use(cors())
const posts = {};
const commentsByPostId={}
app.get("/posts/:id/comments", (req, res) => {
  
    const comments=commentsByPostId[req.params.id]
    if(!comments){
        return res.status(404).send("No comments found")
    }
    res.status(200).send(comments)
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const {content}=req.body;
  const comments=commentsByPostId[req.params.id]||[]
  comments.push({id:commentId,content})
  commentsByPostId[req.params.id]=comments
  res.status(201).send(comments)
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
