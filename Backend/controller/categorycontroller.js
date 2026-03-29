const category = require('../model/categoryModel')
const cloudinary = require('cloudinary').v2

const addCategory = async (req,res) => {
    try {
        const {name} = req.body
        if(!name || !req.file){
            return res.status(400).json({message: 'name & image are required', success: false})
        }

        const alreadyExisits = await category.findOne({name})
        if(alreadyExisits){
            return res.status(409).json({message: 'user already exists', success: false})
        }

        const result = await cloudinary.uploader.upload(req.file.path)
        const newCategory = await category.create({
            name,
            image:result.secure_url
        }) 
        return res.status(201).json({ message: "Category added", success: true, category: newCategory })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error', success: false})
    }
}


const getAllCategory = async (req,res) => {
    try {
        const categories = await category.find().sort({createdAt: -1})
        return res.status(200).json({success: true, categories: categories})
    } catch (error) {
        console.log(error)
        return res.status(402).json({meassage: "Internal server error", success: false})
    }
}


const updateCategory = async (req,res) => {
    try {
        const {id} = req.params
        const {name} = req.body

        const categoryData = await category.findById(id)
        if(!categoryData){
            return res.status(400).json({meassage: 'Category not found', success: true})
        }

        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path)
            categoryData.image = result.secure_url
        }
        if(name) categoryData.name = name
         
        await categoryData.save()
        return res.status(200).json({meassage: 'Category updated.', success: true, categoryData})
    } catch (error) {
        console.log(error)
        return res.status(402).json({meassage: "Internal server error." , success: false})
    }
}

 const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await category.findByIdAndDelete(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    return res.json({ message: "Internal server error", success: false });
  }
};

module.exports = {
    addCategory, 
    getAllCategory,
    updateCategory,
    deleteCategory
}