import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      productId,
      shippingAddress,
      paymentMethod,
      qunatity,
      totalPrice,
    } = req.body;
    const order = new Order({
      userId,
      orderItem: productId,
      shippingAddress,
      paymentMethod,
      qunatity,
      totalPrice,
      orderStatus: "Pending",
    });
    const savedOrder = await order.save();
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export const getOrderByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        data: orders,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId, userId } = req.params;
    const userOrders = await Order.findOne({
      _id: orderId,
      userId: userId,
    });
    if (!userOrders) {
      return res.status(404).json({
        success: false,
        message: "Order not found for this user",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        data: userOrders,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "All orders fetched successfully",
        data: orders,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders",
      error: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: updatedOrder,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};
