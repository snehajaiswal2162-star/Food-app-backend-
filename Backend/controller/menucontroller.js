const Menu = require('../model/menuModel')
const cloudinary = require('cloudinary').v2

// ✅ ADD MENU
const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "All fields are required",
        success: false
      })
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
        success: false
      })
    }

    const result = await cloudinary.uploader.upload(req.file.path)

    await Menu.create({
      name,
      description,
      price,
      category,
      image: result.secure_url
    })

    return res.status(201).json({
      message: "Menu added successfully",
      success: true
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Internal server error",
      success: false
    })
  }
}

// ✅ GET MENU
const getMenuItem = async (req, res) => {
  try {
    const menu = await Menu.find()
      .populate("category", "name")
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      menu: menu
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Internal server error",
      success: false
    })
  }
}

// ✅ UPDATE MENU
const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, price, category, isAvailable } = req.body

    const menuData = await Menu.findById(id)
    if (!menuData) {
      return res.status(404).json({
        message: "Menu not found",
        success: false
      })
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path)
      menuData.image = result.secure_url
    }

    if (name) menuData.name = name
    if (description) menuData.description = description
    if (price) menuData.price = price
    if (category) menuData.category = category
    if (isAvailable !== undefined) menuData.isAvailable = isAvailable

    await menuData.save()

    return res.status(200).json({
      message: "Menu updated successfully",
      success: true
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Internal server error",
      success: false
    })
  }
}

// ✅ DELETE MENU
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params

    const deletedMenu = await Menu.findByIdAndDelete(id)
    if (!deletedMenu) {
      return res.status(404).json({
        message: "Menu not found",
        success: false
      })
    }

    return res.status(200).json({
      message: "Menu deleted successfully",
      success: true
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Internal server error",
      success: false
    })
  }
}

module.exports = {
  addMenuItem,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem
}
