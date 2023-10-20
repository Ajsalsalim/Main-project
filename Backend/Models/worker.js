const mongoose = require("mongoose");

const Schema= mongoose.Schema;

const workerSchema = new Schema({

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
    profilepicture:{
        type:String
    },
    gender:{
        type:String
    },
    profession:[
        {
           name: {
                type:String,
               
                
            },
            experience:{
                type:String
                
            },
            description:{
                type:String
            }
            
        }
    ],
    
    location:{
        type:String
    },
    
    timepreference:{
        type:String
    },
    rating: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: String
        },
      ],
    availability:{
        type:Boolean,
        default:false
    },
    isverified: {
        type: String,
        enum: ['verified', 'pending', 'rejected'],
        default: 'pending'
      },
    isprofilecreated:{
        type:Boolean,
        default:false
    },
    isblocked:{
        type:Boolean,
        default:false 

    },
    
     createdAt: {
        type: Date,
        default: Date.now
      }

   


})
module.exports = mongoose.model("Worker",workerSchema)