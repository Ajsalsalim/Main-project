const express = require("express");
const http = require('http');
const mongoose = require("mongoose");
const cookieparser= require("cookie-parser");
const socketIO = require("./Socket/socket");


const cors=require("cors")
const app= express();
app.use(cors({credentials:true, origin:["http://localhost:3000","https://jobgenie-orpin.vercel.app"]}));
require("dotenv").config();
const userrouter= require("./Routers/userrouter")
const chatrouter = require("./Routers/chatrouter")
const adminrouter= require("./Routers/adminrouter")




app.use(express.static("public"));
app.use(cookieparser())
app.use(express.json())




app.use("/",userrouter);
app.use("/admin",adminrouter)
app.use("/chat",chatrouter)

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URL)



.then(()=>{
   let server= app.listen(5000,()=>{
    console.log("database is connected to localhost 5000");
   });
   socketIO.attach(server);
   
}).catch((err)=>{
    console.log(err);
})

