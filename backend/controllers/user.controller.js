// controllers/user.controller.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Update user profile
export const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, address, phoneNumber } = req.body;
    const userId = req.userId; // From auth middleware

    // Validate required fields (excluding email - shouldn't be changed casually)
    if (!firstName || !lastName || !address || !phoneNumber) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        address,
        phoneNumber,
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
      }
    ).select("-password"); // Exclude password from results

    if (!updatedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Update password (separate endpoint for security)
export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;

    if (!currentPassword || !newPassword) {
      const error = new Error("Both current and new password are required");
      error.statusCode = 400;
      throw error;
    }

    // Get user with password field
    const user = await User.findById(userId).select("+password");
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      const error = new Error("Current password is incorrect");
      error.statusCode = 401;
      throw error;
    }

    // Hash and save new password
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
