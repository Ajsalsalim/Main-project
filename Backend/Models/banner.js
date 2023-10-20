const mongoose = require("mongoose");
const Schema = mongoose.Schema


const BannerSchema = new Schema({
    name:{
        type: String,
        required:true

    },
    image:{
        type:Array
    }

})
module.exports = mongoose.model("Banner",BannerSchema)