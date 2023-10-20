const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    room: { type: String, required: true },
    messages: [
        {
            userId: { type: String, required: true },
            workerId: { type: String, required: true },
            author:{type:String,required:true},
            message: { type: String, required: true },
            time: {  type: String, required: true },
        }
    ]


})
module.exports = mongoose.model('Chat', chatSchema);

