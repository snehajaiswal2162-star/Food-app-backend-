const express = require( "express");

const {adminOnly,protect} = require( "../middleware/authMiddleware.js")
const { getAllOrders, getUserOrders, placeOrder, updateOrderStatus } = require( "../controller/ordercontroller.js");
const orderRoutes=express.Router();
orderRoutes.post("/place",protect,placeOrder);
orderRoutes.get("/my-orders",protect,getUserOrders);
orderRoutes.get("/order",protect,adminOnly,getAllOrders);
orderRoutes.put("/update-status/:orderId",protect,adminOnly,updateOrderStatus);

module.exports =  orderRoutes;