import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const {
      userId,
      productId,
      productName,
      thumbnailUrl,
      size,
      quantity,
      totalPrice,
    } = req.body;
    const product = await Product.findById(productId);

    const isCorrectTotal = totalPrice === product.price * quantity;
    const newTotal = isCorrectTotal ? totalPrice : product.price * quantity;

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    let data;
    const existingCart = await Cart.findOne({ userId, productId, size });
    if (!existingCart) {
      const newObject = new Cart({
        userId,
        productId,
        productName,
        thumbnailUrl,
        size,
        quantity,
        totalPrice: newTotal,
      });
      await newObject.save();
      data = newObject;
    } else {
      existingCart.quantity = existingCart.quantity + quantity;
      existingCart.totalPrice = existingCart.totalPrice + newTotal;
      await existingCart.save();
      data = existingCart;
    }
    return res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to add to cart",
      error: error.message,
    });
  }
};

export const getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.find({ userId }).sort({ createdAt: -1 });

    if (cart.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Your cart is empty",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findByIdAndDelete(cartId);
    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart item deleted successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete cart item",
      error: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    const product = await Product.findById(cart.productId);

    cart.quantity = Number(quantity);
    cart.totalPrice = cart.quantity * product.price;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
