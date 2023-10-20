const express = require("express");
const {getmessages,getuserchats,userchatcontents,getworkerchats,workerchatcontents}= require("../Controllers/chatcontroller");
const { verifyToken } = require("../Middlewares/verifytoken");
const chatrouter= express.Router()


chatrouter.get("/getmessages/:roomId",verifyToken,getmessages)
chatrouter.get("/getchats",verifyToken,getuserchats)
chatrouter.get("/userchatcontents",verifyToken,userchatcontents)
chatrouter.get("/getworkerchats",verifyToken,getworkerchats)
chatrouter.get("/workerchatcontents",verifyToken,workerchatcontents)
module.exports=chatrouter