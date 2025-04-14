import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      firstName,
      lastName,
      address,
      email,
      phoneNumber,
      password,
      termsAccepted,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !address ||
      !email ||
      !phoneNumber ||
      !password ||
      !termsAccepted
    ) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    // Validate terms acceptance
    if (termsAccepted !== true) {
      const error = new Error("You must accept the terms and conditions");
      error.statusCode = 400;
      throw error;
    }

    // Check for existing user
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      const error = new Error("User with this email already exists");
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await User.create(
      [
        {
          firstName,
          lastName,
          address,
          email,
          phoneNumber,
          password: hashedPassword,
          termsAccepted,
        },
      ],
      { session }
    );

    // Generate JWT token
    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    // Prepare user data for response (without password)
    const userData = newUser[0].toObject();
    delete userData.password;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        token,
        user: userData,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    // Find user with password selected
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Prepare user data for response (without password)
    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: userData,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
