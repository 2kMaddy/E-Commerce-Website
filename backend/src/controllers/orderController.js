import crypto from "crypto";
import Razorpay from "razorpay";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, items, shippingAddress, paymentMethod, grandTotal } =
      req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required",
      });
    }

    const options = {
      amount: grandTotal,
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const razorpay = new Razorpay({
      key_id: process.env.RAZOR_PAY_KEY_ID, // from Razorpay Dashboard
      key_secret: process.env.RAZOR_PAY_KEY_SECRET, // keep this safe, never expose in frontend
    });

    const order = await razorpay.orders.create(options);

    const orderItems = [];
    let totalPrice = 0;

    for (const item in items) {
      const {
        productId,
        productName,
        thumbnailUrl,
        size,
        quantity,
        totalPrice,
      } = item;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${productName} not found`,
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for product ${product.name}`,
        });
      }

      const itemTotal = product.price * quantity;
      totalPrice += itemTotal;

      orderItems.push({
        productId,
        productName,
        thumbnailUrl,
        size,
        quantity,
        price: product.price,
        itemTotal,
      });

      product.stock -= quantity;
      await product.save();
    }

    const newOrder = new Order({
      userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      grandTotal: totalPrice,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: savedOrder,
      order: order,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const hmac = crypto.createHmac("sha256", "YOUR_KEY_SECRET");
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === razorpay_signature) {
    res.json({ status: "success" });
  } else {
    res.status(400).json({ status: "failure" });
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
    const order = await Order.findOne({ _id: orderId, userId: userId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found for this user",
      });
    }
    const user = await User.findById(userId);
    const product = await Product.findById(order.orderItem);
    const response = {
      ...order.toObject(),
      productDetails: product || null,
      userDetails: user || null,
    };
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: response,
    });
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
    }
    // Await all user lookups and convert Mongoose docs to plain objects
    const updatedOrders = await Promise.all(
      orders.map(async (each) => {
        const user = await User.findById(each.userId).lean();
        return { ...each.toObject(), userDetails: user };
      })
    );
    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      data: updatedOrders,
    });
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

export const cancelOrder = async (req, res) => {
  try {
    const { userId, orderId } = req.body;
    const order = await Order.find({ _id: orderId, userId: userId });
    const { orderStatus } = order[0];
    if (["Pending", "Confirmed", "Packed"].includes(orderStatus)) {
      const cancelledOrder = await Order.findByIdAndUpdate(
        orderId,
        { orderStatus: "Cancelled" },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Order cancelled successfully",
        data: cancelledOrder,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled at this stage",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel order",
      error: error.message,
    });
  }
};
