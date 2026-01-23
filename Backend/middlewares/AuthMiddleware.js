import jwt from "jsonwebtoken"
import User from "../models/User.js";

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }


    const decoded = jwt.verify(token,"graphura_jwt_secret");
    const userId = decoded.userId || (decoded.user ? decoded.user._id : null);

    if (!userId) {
      console.log("Token decoded but no ID found. Payload:", decoded);
      return res.status(401).json({ message: "Invalid token structure" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; 

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuth
