import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const { JWT_SECRET } = process.env;

export const authenticate = async (req, res, next) => {
  try {
    // 1. Get token from headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required (Bearer token)",
      });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. Find user and check if still exists
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found - token invalid",
      });
    }

    // 4. Attach user to request
    req.user = user;
    req.userId = user._id; // For easier access to user ID
    next();
  } catch (error) {
    // Handle different JWT errors specifically
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

    // For other errors
    res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};

//curently not in use

// export const optionalAuthenticate = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (authHeader && authHeader.startsWith("Bearer ")) {
//       const token = authHeader.split(" ")[1];
//       const decoded = jwt.verify(token, JWT_SECRET);
//       const user = await User.findById(decoded.userId).select("-password");

//       if (user) {
//         req.user = user;
//         req.userId = user._id;
//       }
//     }
//     next();
//   } catch (error) {
//     // We don't block the request for optional auth
//     next();
//   }
// };

// Admin middleware (builds on authenticate)
export const requireAdmin = async (req, res, next) => {
  authenticate(req, res, () => {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Admin privileges required",
      });
    }
    next();
  });
};
