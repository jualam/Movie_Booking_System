import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const { JWT_SECRET } = process.env;

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required (Bearer token)",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found - token invalid",
      });
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};

export const requireAdmin = async (req, res, next) => {
  try {
    // First authenticate normally
    await authenticate(req, res, async () => {
      if (!req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Admin privileges required",
        });
      }
      next();
    });
  } catch (error) {
    next(error);
  }
};
