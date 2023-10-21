const {Server} = require("socket.io")
const Chat = require("../Models/Chat")

const socketIO = new Server({
    cors: {
      origin: ['http://localhost:3000','https://jobgenie-orpin.vercel.app',"https://jobgenie.live"],
      methods: ['GET', 'POST',"DELETE"],
    },
  })


  socketIO.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
  
    socket.on('joinRoom', ({ userId, workerId }) => {
      const room = `${userId}-${workerId}`;
      socket.join(room);
      console.log(`User ${userId} joined room ${room}`);
    });
  
    socket.on('send_message', async(data) => {

      const newMessage = {
        userId: data.userId,
        workerId: data.workerId,
        author:data.author,
        message: data.message,
        time: data.time,
    };
    console.log("fjerfjegj"+newMessage);

      try{
        const chat = await Chat.findOneAndUpdate(
          { room: data.room },
          { $push: { messages: newMessage } },
          { new: true, upsert: true }
      );
           await chat.save();
      console.log("Message saved to MongoDB");
      }catch(err){
        console.log(err);
      }
      console.log("edaaa"+data);

      socket.to(data.room).emit('recieve_message',data);
    });
  
    socket.on('leaveRoom', ({ userId, workerId }) => {
      const room = `${userId}-${workerId}`;
      socket.leave(room);
      console.log(`User ${userId} left room ${room}`);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  socketIO.on("connect_error", (error) => {
    console.log("Socket connect_error:", error);
  });
  
  socketIO.on("error", (error) => {
    console.log("Socket error:", error);
  });
  module.exports = socketIO;
  
  