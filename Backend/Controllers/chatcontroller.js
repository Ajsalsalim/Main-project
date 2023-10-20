const Chat= require("../Models/Chat")
const User = require("../Models/user");
const Worker = require("../Models/worker")


const getmessages = async(req,res)=>{
    try{
        const {roomId}= req.params;
        console.log(roomId);
        const chat = await Chat.findOne({room:roomId})
        console.log(chat)
        if(chat){
            const messages=chat.messages
            return res.json(messages)

        }else{
            return res.json({message:"didnt chat yet"})
        }
      
      

    }catch(err){
        console.log(err);
    }
}
const getuserchats=async(req,res)=>{
    try{
        const {userid}=req.query;
        const user=await User.findOne({_id:userid})
        const username=user.name;
        const profilepicture=user.profilepicture

        const chats = await Chat.find(
            { "messages.userId": userid }, // Use $elemMatch to filter messages array 
          );
          console.log(chats);
          if(chats){
            const uniqueWorkerIds = Array.from(new Set(chats.flatMap(chat => chat.messages.map(message => message.workerId))));
            console.log(uniqueWorkerIds);
          
            const workers = await Worker.find({ _id: { $in: uniqueWorkerIds } });
            console.log(workers);
            return res.json({username,profilepicture,workers});

          }else{
            return res.json({message:"no chats"})
          }
        
          

         

         
           
          } 


    catch(err){
        console.log(err);
    }
  }
  const userchatcontents=async(req,res)=>{
    try{
        const {userid,workerid}=req.query;
        const chat = await Chat.findOne(
            { "messages.userId": userid,"messages.workerId":workerid }, // Use $elemMatch to filter messages array 
          );

          console.log(chat);
          return res.json(chat)

    }
    catch(err){
        console.log(err);
    }
  }
  const getworkerchats=async(req,res)=>{
    try{
        const {workerid}=req.query;
        const worker=await Worker.findOne({_id:workerid})
        const workername=worker.name;
        const profilepicture=worker.profilepicture

        const chats = await Chat.find(
            { "messages.workerId": workerid }, // Use $elemMatch to filter messages array 
          );
          console.log(chats);
          if(chats){
            const uniqueUserIds = Array.from(new Set(chats.flatMap(chat => chat.messages.map(message => message.userId))));
            console.log(uniqueUserIds);
          
            const users = await User.find({ _id: { $in: uniqueUserIds } });
            console.log(users);
            return res.json({workername,profilepicture,users});

          }else{
            return res.json({message:"no chats"})
          }
        
           
          } 


    catch(err){
        console.log(err);
    }
  }
  const workerchatcontents=async(req,res)=>{
    try{
        const {userid,workerid}=req.query;
        const chat = await Chat.findOne(
            { "messages.userId": userid,"messages.workerId":workerid }, // Use $elemMatch to filter messages array 
          );

          console.log(chat);
          return res.json(chat)

    }
    catch(err){
        console.log(err);
    }
  }

exports.getmessages=getmessages
exports.getuserchats=getuserchats
exports.userchatcontents=userchatcontents
exports.getworkerchats=getworkerchats
exports.workerchatcontents=workerchatcontents