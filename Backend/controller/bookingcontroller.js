const Booking = require("../model/bookingModel")
const cloudinary = require('cloudinary').v2

const createBooking = async (req,res) => {
    try {
        
        const {id} = req.user
        const{name,phone,numOfPeople,date,time,note} = req.body

        if(!name || !phone || !numOfPeople || !date || !time ) 
            return res.status(200).json({message: "All field are required", success: false})

        const existingBooking = await Booking.findOne({
            date,time, status: {$ne : "Cancelled"}
        })
        if(existingBooking)
            return res.status(200).json({message: "This time slot is already booked." , success: false})

        const newBooking = await Booking.create({
            user:id,
            name,phone,numOfPeople,date,time,note
        })
        res.send({message: "Table booked successfully.", success:true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error", success: false})
    }
}

const getUserBookings = async (req,res) => {
    try {
        
        const {id} = req.user
        const booking = await Booking.find({user:id}).sort({createdAt: -1})
        return res.status(200).json({booking, success:true})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error", success: false})
    }
}

const getAllBookings = async (req,res) => {
    try {
        const {id} = req.user
        const booking = await Booking.find().populate('user','name email').sort({createdAt: -1})
        return res.status(200).json({booking, success:true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "internal server error", success: false})
    }
}

const updateBookingStatus = async (req,res) => {
    try {
        
        const {bookingId} = req.params
        const {status} = req.body

        const booking = await Booking.findById(bookingId)
        if(!bookingId)
            return res.status(200).json({message:"Booking not found." ,success: false})

        booking.status = status
        await booking.save()
        return res.status(200).json({message: "Booking status updated!", success: true, booking})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error", success: false})
    }
}

module.exports = {
    createBooking,
    getUserBookings,
    getAllBookings,
    updateBookingStatus
}