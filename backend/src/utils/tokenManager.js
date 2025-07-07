import jwt from "jsonwebtoken";

export const generateToken = (userId, email) => {
  const payLoad = { userId, email };
  const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export const verifyToken = (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    const token = header.split(" ")[1];

    if (!token) {
      return res.statue(401).json({
        success: false,
        message: "Unauthorized User",
      });
    } else {
      return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
          if (err) {
            reject(err.message);
            return res.status(401).json({
              success: false,
              message: "Unauthorized user",
            });
          } else {
            resolve();
            next();
          }
        });
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
      error: error.message,
    });
  }
};
