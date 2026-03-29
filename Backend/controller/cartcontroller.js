const Cart = require ('../model/cartModel')
const  Menu = require ('../model/menuModel')

 const addToCart = async (req, res) => {
  try {
    const { menuId, quantity } = req.body;
    const userId = req.user._id;

    const menuItem = await Menu.findById(menuId);
    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
        success: false,
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.menuItem.toString() === menuId
    );

    const qty = Number(quantity);

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({ menuItem: menuId, quantity: qty });
    }

    await cart.save();

    res.status(200).json({
      message: "Item added to cart",
      success: true,
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }

};




// Get cart
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate(
      "items.menuItem"
    );

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json({ cart, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Remove item
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { menuId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false,
      });
    }

    cart.items = cart.items.filter(
      (item) => item.menuItem.toString() !== menuId
    );

    await cart.save();

    res.status(200).json({
      message: "Item removed from cart",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart
}