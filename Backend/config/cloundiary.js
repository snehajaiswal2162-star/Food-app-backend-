const cloudinary = require('cloudinary').v2

const connectcloundinary = () => {
    console.log("Api key", process.env.CLOUDINARY_API_KEY)
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
    } catch (error) {
        console.log({message: "error occur in cloundinary.", error})
    }
}

module.exports = connectcloundinary