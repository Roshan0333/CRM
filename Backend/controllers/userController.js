// Backend/controllers/userController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const registerUser = async (req, res) => {
  try {
    let {
      firstName, lastName, bankName, ifsc, bankAccount,
      email, password, department, role
    } = req.body;

    // Normalize inputs
    email = email.trim().toLowerCase();
    department = department.trim().toLowerCase();
    role = role.trim().toLowerCase();

    if (!email || !password || !department || !role) {
      return res.status(400).json({ message: "Please fill all fields." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstName, lastName, bankName, ifsc, bankAccount,
      email, password: hashedPassword, department, role
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, email, department, role }
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Backend/controllers/userController.js - loginUser only
export const loginUser = async (req, res) => {
  try {
    let { email, password, department, role } = req.body;

    email = email.trim().toLowerCase();
    const inputDept = department.trim().toLowerCase();
    const inputRole = role.trim().toLowerCase();

    if (!email || !password || !department || !role) {
      return res.status(400).json({ message: "Please fill all fields." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found. Please register first." });
    }

    // console.log("LOGIN BODY:", { email, department, role });
    // console.log("USER DB:", { department: user.department, role: user.role });

    // Handle legacy short department names
    const normalizeDept = (dept) => {
      const deptLower = dept.toLowerCase();
      const mapping = {
        'sales': 'sales department',
        'finance': 'finance department',
        'management': 'management department',
        'feedback': 'feedback department'
      };
      return mapping[deptLower] || deptLower;
    };

    const normInputDept = normalizeDept(inputDept);
    const normDbDept = normalizeDept(user.department);
    const normDbRole = user.role.toLowerCase();

    if (normDbDept !== normInputDept || normDbRole !== inputRole) {
      return res.status(400).json({
        message: `invalid crediantials.`
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      token,
      user: { 
        id: user._id, 
        email: user.email, 
        department: user.department, 
        role: user.role 
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
