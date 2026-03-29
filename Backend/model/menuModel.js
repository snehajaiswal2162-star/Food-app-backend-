const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:true
    }


},{timestamps:true})

module.exports = mongoose.model('Menu',menuSchema)