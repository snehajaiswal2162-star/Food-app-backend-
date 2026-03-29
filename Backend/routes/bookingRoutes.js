const express = require ("express");

const {adminOnly,protect} = require( "../middleware/authMiddleware.js")
const { createBooking, getAllBookings, getUserBookings, updateBookingStatus } = require ("../controller/bookingController.js");


const bookingRoutes=express.Router();

bookingRoutes.post("/create",protect,createBooking);
bookingRoutes.get("/my-bookings",protect,getUserBookings);
bookingRoutes.get("/booking",protect,adminOnly,getAllBookings);
bookingRoutes.put("/update-status/:bookingId",protect,adminOnly,updateBookingStatus);



module.exports =  bookingRoutes;