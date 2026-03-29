const express = require( "express");

const {adminOnly,protect} = require("../middleware/authMiddleware.js")
const upload = require( "../middleware/multer.js")
const { addMenuItem, deleteMenuItem, getMenuItem, updateMenuItem } = require( "../controller/menuController.js");

const menuRoutes=express.Router();

menuRoutes.post("/add",protect,adminOnly,upload.single("image"),addMenuItem)
menuRoutes.put("/update/:id",adminOnly,upload.single("image"),updateMenuItem)
menuRoutes.delete("/delete/:id",adminOnly,deleteMenuItem)
menuRoutes.get("/all",getMenuItem)



module.exports =  menuRoutes;