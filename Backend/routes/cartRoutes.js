const express = require( "express");

const { adminOnly, protect } = require ("../middleware/authMiddleware.js");

const {
  addToCart,
  getCart,
  removeFromCart,
} = require( "../controller/cartcontroller.js");

const cartRoutes = express.Router();

cartRoutes.post("/add", protect, addToCart);
cartRoutes.get("/get", protect, getCart);
cartRoutes.delete("/remove/:menuId", protect, removeFromCart);

module.exports =  cartRoutes;