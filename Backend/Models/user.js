const mongoose = require("mongoose");

const Schema= mongoose.Schema;

const userSchema = new Schema({

    name: {
        type : String,
        required : true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: false,
        minlength:8
    },
    phone:{
        type:String,
        required:false
        
    },
    gender:{
        type:String
    },
    address:{
        type:String

    },
    profilepicture:{
        type:String
    },
    isblocked:{
        type:Boolean,
        default:false 

    },
    isprofilecreated:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now
      }

   


})
module.exports = mongoose.model("User",userSchema)