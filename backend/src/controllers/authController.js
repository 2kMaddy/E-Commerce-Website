import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { generateToken } from "../utils/tokenManager.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      message: "Google token is required.",
    });
  }

  try {
    // 1.verify the ID token from Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, sub: googleId } = ticket.getPayload();

    // 2.check if the user already exists in your database
    let user = await User.findOne({ email });

    if (user) {
      // If user exists, ensure their googleId is stored and log them in
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      // If user dosen't exist, create a new user in your database
      user = await User.create({
        name,
        email,
        googleId,
        // Password is not needed for Google OAuth users
      });
    }

    // 3.create an application-specific JWT for the user session
    const authToken = generateToken(user._id.toString(), user.email);

    // 4.send user info and the app token back to the frontend
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
      authToken: authToken,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({
      message: "Invalid Google token or login failed.",
    });
  }
};

export default googleLogin;
