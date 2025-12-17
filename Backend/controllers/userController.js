import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Registration
export const registerUser = async (req, res) => {
  try {
    const { firstname,lastname, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log('registration error ');
    
    res.status(500).json({ message: "Server error", error });
  }
};

// User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find user by email
    const user = await User.findOne({ email,role });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { 
        return res.status(400).json({ message: "Invalid email or password" });
    }
    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_IN }
    );
    user.password = undefined; // Hide password
    res.status(200).json({ token, message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

