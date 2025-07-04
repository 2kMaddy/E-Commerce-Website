import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { generateToken } from "../utils/tokenManager.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const query = { email };
    if (role) query.role = role;
    const existingUser = await User.findOne(query);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      const hashedPassword = await hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });
      await newUser.save();

      const token = generateToken(
        newUser._id.toString(),
        newUser.email.toString()
      );

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: newUser,
        authToken: token,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email, role: role || "user" });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    } else {
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid password",
        });
      } else {
        const token = generateToken(user._id.toString(), user.email.toString());

        res.status(200).json({
          success: true,
          message: "User logged in successfully",
          data: user,
          authToken: token,
        });
      }
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to login user",
      error: e.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
      error: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User profile updated successfully",
        data: updatedUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user profile",
      error: error.message,
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User profile deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Profile Deletion Failed",
      error: error.message,
    });
  }
};
