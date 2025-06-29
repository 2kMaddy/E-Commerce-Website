import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, product, quantity, totalPrice } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // If cart does not exist, create a new one
      cart = new Cart({
        userId,
        product: [product],
        quantity,
        totalPrice,
      });
    } else {
      // If cart exists, update it
      const existingProductIndex = cart.product.findIndex(
        (item) => item._id.toString() === product._id.toString()
      );

      if (existingProductIndex > -1) {
        // If product already exists in the cart, update the quantity and total price
        cart.product[existingProductIndex].quantity += quantity;
        cart.totalPrice += totalPrice;
      } else {
        // If product does not exist in the cart, add it
        cart.product.push(product);
        cart.quantity += quantity;
        cart.totalPrice += totalPrice;
      }
    }
    await cart.save();
    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
      error: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(401).json({
        success: false,
        message: "Cart not found for this user",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Cart fetched successfully",
        data: cart,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(401).json({
        success: false,
        message: "User cart not found",
      });
    } else {
      const productIndex = cart.product.findIndex(
        (item) => item._id.toString() === productId.toString()
      );

      if (productIndex > -1) {
        // Update the quantity of the product in the cart
        cart.product[productIndex].quantity = quantity;
        cart.totalPrice = cart.product.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        await cart.save();
        res.status(200).json({
          success: true,
          message: "Cart item updated successfully",
          data: cart,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Product not found in cart",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update cart item",
      error: error.message,
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cartItem = await Cart.findOne({ userId });
    if (!cartItem) {
      res.status(404).json({
        success: false,
        message: "Product not found in cart list",
      });
    } else {
      const updatedProducts = cartItem.product.filter(
        (item) => item._id.toString() !== productId.toString()
      );

      if (updatedProducts.length === cartItem.product.length) {
        return res.status(404).json({
          success: false,
          message: "Product not found in cart",
        });
      }

      cartItem.product = updatedProducts;
      cartItem.totalPrice = updatedProducts.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      await cartItem.save();

      res.status(200).json({
        success: true,
        message: "Cart item deleted successfully",
        data: cartItem,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete cart item",
      error: error.message,
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findByIdAndDelete(userId);
    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Cart cleared successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to clear cart",
      error: error.message,
    });
  }
};
