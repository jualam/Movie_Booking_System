import express from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import User from "./models/user.model.js";
import bcrypt from "bcryptjs";
import bookingRoutes from "./routes/booking.routes.js";
import reportRoutes from "./routes/report.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message || err.toString(),
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the MBS");
});

// Enhanced admin creation function
const createAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn("ADMIN_EMAIL or ADMIN_PASSWORD not set in .env");
    return;
  }

  try {
    // Check if admin exists and is properly configured
    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      // Create new admin
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      admin = await User.create({
        firstName: "Admin",
        lastName: "User",
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true,
        termsAccepted: true,
        address: "Admin Address",
        phoneNumber: "0000000000",
      });
      console.log("Admin user created successfully");
    } else if (!admin.isAdmin) {
      // Update existing user to admin
      admin.isAdmin = true;
      await admin.save();
      console.log("Existing user upgraded to admin");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error creating/updating admin user:", error);
  }
};

// Database connection and server startup
const startServer = async () => {
  try {
    await connectToDatabase();
    console.log("Connected to MongoDB");

    await createAdminUser();

    app.listen(PORT, () => {
      console.log(`API is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;
