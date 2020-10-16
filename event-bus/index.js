const express=require('express')
const cors = require("cors");
const axios=require('axios')
const app=express()
app.use(cors())
app.use(express.json())
const events=[]
app.post("/events",async (req,res)=>{

const event=req.body;
events.push(event)
await axios.post('http://localhost:4002/events',event)
await axios.post('http://localhost:4001/events',event)
await axios.post('http://localhost:4003/events',event)
await axios.post('http://localhost:4004/events',event)
res.send({status:"Ok"})
})

app.get("/events",(req,res)=>{
    res.send(events)
})

app.listen(4005,()=>{
    console.log('App is listening on port 4005')
})