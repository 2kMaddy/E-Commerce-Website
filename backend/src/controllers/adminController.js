import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { generateToken } from "../utils/tokenManager.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email: email, role: "admin" });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin not found",
      });
    } else {
      const isPasswordValid = await compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid Password",
        });
      } else {
        const token = generateToken(
          admin._id.toString(),
          admin.email.toString()
        );

        res.status(200).json({
          success: true,
          message: "Admin logged in successfully",
          data: admin,
          authToken: token,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
};
