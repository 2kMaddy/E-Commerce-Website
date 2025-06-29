import Joi from "joi";

// Schema definitions

const email = Joi.string().email().required();
const password = Joi.string().min(6).required();
const name = Joi.string().trim().min(2).max(50).required();
const role = Joi.string().valid("user", "admin").default("user");

const signupSchema = Joi.object({
  name,
  email,
  password,
  role,
});

const loginSchema = Joi.object({
  email,
  password,
  role,
});

// Middleware function for signup
export const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

// Middleware function for login
export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};
