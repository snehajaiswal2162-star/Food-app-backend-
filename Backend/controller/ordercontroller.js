const Order = require('../model/orderModel')
const Cart = require('../model/cartModel')
const cloudinary = require('cloudinary').v2

const placeOrder = async (req,res) => {
    try {
        
        const {id} = req.user
        const {address} = req.body

        if(!address) return res.status(200).json({message: "Address field is required", success: false})

        const cart = await Cart.findOne({user:id}).populate('items.menuItem')
        
        if(!cart || cart.items.length === 0) return res.status(200).json({message: "Your cart is empty", success: false})

        const totalAmount = cart.items.reduce((sum,item)=>sum+item.menuItem.price*item.quantity,0)

        const newOrder = await Order.create({
            user:id,
            items:cart.items.map((i)=> ({
                menuItem:i.menuItem._id,
                quantity:i.quantity
            })),
            totalAmount,
            address
        })

        cart.items = []
        await cart.save()
        return res.status(200).json({message:"Order placed successfully", success:true, order:newOrder})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error", success: false})
    }
}

const getUserOrders = async (req,res) => {
    try {
        
        const {id} = req.user
        const orders = await Order.find({user:id}).toSorted({createdAt:-1})
        res.status(200).json(orders)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error", sucess: false})
    }
}

const getAllOrders =  async (req,res) => {
    try {
        const {id} = req.user
        const orders = await Order.find().populate("user").populate("items.menuItem").sort({createdAt: -1})
        return res.status(200).json({success: true, orders})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error", success: false})       
    }
}

const updateOrderStatus = async (req,res) => {
    try {
        const {orderId} = req.params
        const {status} = req.body

        const order = await Order.findById(orderId)

        if(!order) return res.status(200).json({message: 'Order not found!', success: false})

        order.status = status
        await order.save()
        return res.status(200).json({message: "Order updated successfully", success: true, order})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error", success: false})
    }
}

module.exports = {
    placeOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
}