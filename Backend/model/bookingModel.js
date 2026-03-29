const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    name:{
        type:String,
        required:true
    },

    phone:{
        type:Number,
        required:true,
    },

    date:{
        type:String,
        required:true,
    },

    numOfPeople:{
        type:String,
        required:true,
    },

    time:{
        type:String,
        required:true
    },

    note:{
        type:String,
        default:" "
    },

    status:{
        type:String,
        enum:["Pending","Approved","Cancelled"],
        default:"Pending"
    }
},{timestamps:true})

module.exports = mongoose.model("Booking", bookingSchema)