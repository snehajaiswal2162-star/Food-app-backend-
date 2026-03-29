// const mongoose = require('mongoose')

// const cartSchema = new mongoose.Schema({
    
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'user',
//         required:true,
//     },

//     items:[
//         {
//             menuItem:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref:'Menu',
//             required:true
//         },

//         quantity:{
//             type:Number,
//             required:true
//         }
//         }
//     ],

//     totalAmount:{
//         type:Number,
//         required:true
//     },

//     address:{
//         type:String,
//         required:true
//     },

//     status:{
//         type:String,
//         enum:["Pending","Preparing","Delivered"],
//         default:"Pending"
//     },

//     paymentMethod:{
//         type:String,
//         default:"Cash on delivery"
//     }
// },{timestamps:true})

// module.exports = mongoose.model('Cart',cartSchema)

const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],

  totalAmount: {
    type: Number,
    default: 0,        // ✅ FIX
  },

  address: {
    type: String,
    default: "",       // ✅ FIX
  },

  status: {
    type: String,
    enum: ["Pending", "Preparing", "Delivered"],
    default: "Pending",
  },

  paymentMethod: {
    type: String,
    default: "Cash on delivery",
  },
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema)