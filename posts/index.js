const express = require("express");
const { randomBytes } = require("crypto");
const axios =require('axios')
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async  (req, res) => {
  const id = randomBytes(4).toString("hex");
  console.log(req.body);
  const { title } = req.body;
  posts[id] = { id, title };

   const status= await axios.post('http://event-bus-srv:4005/events',{
    type:'PostCreated',
    data:{id,title}
  })
  
  res.status(201).send(posts[id]);
});

app.post("/events",(req,res)=>{
  console.log("Received Event",req.body.type)
  res.send({})
})
app.listen(4002, () => {
  console.log("Listening on port 4002");
});
