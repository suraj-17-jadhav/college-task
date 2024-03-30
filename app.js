const express = require('express');
const app=express();
const port=process.env.port || 5500;
const mongoose=require("mongoose");
const {mongoUrl}= require("./key")
const cors = require("cors");
const path = require("path")

app.use(cors());
require('./models/model')
require("./models/post")
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))

mongoose.connect(mongoUrl);

mongoose.connection.on("connected",()=>{
    console.log("successfully connected to mongoDb");
 })
 
 mongoose.connection.on("error",()=>{
    console.log("not connected to mongo");
 })

 //  serving the frontend
app.use(express.static(path.join(__dirname, "./build")))

app.get("*" , (req,res)=>{
    res.sendFile(
        path.join(__dirname , "./build/index.html") ,
        function(err) {
            res.status(500).send(err)
        }
    )
})
app.listen(port,()=>{
    console.log("server is runnning on port "+ port);
})