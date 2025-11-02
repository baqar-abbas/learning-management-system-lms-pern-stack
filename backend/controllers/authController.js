// /controllers/authController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const generateToken = require("../utils/generateToken");

/**
 * @desc    Register a new user
 * @route   POST /auth/register
 * @access  Public
 */

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      const error = new Error("Please provide name, email and password");
      error.statusCode = 400;
      throw error;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    // Implement Centralized error handling in authController using error handler middlware
    if (existingUser) {
      // return res.status(400).json({ message: "User already exists" });
      const error = new Error("User with this email already exists");
      error.statusCode = 400;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default role assignment logic
    // If role is not provided → assign "student"
    // Prevent API users from registering directly as admin (safety)
    const assignedRole = role && role === "admin" ? "admin" : "student";

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: assignedRole,
    });

    // Respond with token and user info
    const token = generateToken(user.id);
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /auth/login
 * @access  Public
 */

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // return res.status(401).json({ message: "Invalid credentials" });
      const error = new Error("Invalid credentials - Email or password");
      error.statusCode = 401;
      throw error;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // return res
      //   .status(401)
      //   .json({ message: "Invalid credentials - password do not match" });
      const error = new Error("Invalid credentials - Password does not match");
      error.statusCode = 401;
      throw error;
    }

    // Respond with token
    const token = generateToken(user.id);
    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current logged-in user
 * @route   GET /auth/me
 * @access  Private
 */

const getMe = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }, // Exclude password from response
    });
    if (!user) {
      // return res.status(404).json({ message: "User not found" });
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
