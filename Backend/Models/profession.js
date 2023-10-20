const mongoose = require("mongoose");
const Schema = mongoose.Schema


const professionSchema = new Schema({
    name:{
        type: String,
        required:true,
        unique:true

    },
    description:{
        type:String
    },
    image:{
        type:String  
    },
    deleted:{
        type:Boolean,
        default:false
    }

})
module.exports = mongoose.model("Profession",professionSchema)