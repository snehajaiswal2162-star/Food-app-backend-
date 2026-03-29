
const express = require( "express");

const {adminOnly,protect} = require( "../middleware/authMiddleware.js")
const upload = require( "../middleware/multer.js")
const { addCategory, deleteCategory, getAllCategory, updateCategory } = require( "../controller/categorycontroller.js");
const categoryRoutes=express.Router();

categoryRoutes.post("/add",protect,adminOnly,upload.single("image"),addCategory);
categoryRoutes.put("/update/:id",adminOnly,upload.single("image"),updateCategory);
categoryRoutes.delete("/delete/:id",adminOnly,deleteCategory);
categoryRoutes.get("/all",getAllCategory);


module.exports =  categoryRoutes;