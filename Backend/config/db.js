const mongoose = require('mongoose')

 const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database is connected.")
    }catch(err){
        console.log("Connection failed!...")
    }
}

module.exports = connectDB