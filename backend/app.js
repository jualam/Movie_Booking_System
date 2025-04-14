import express from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import User from "./models/user.model.js";
import bcrypt from "bcryptjs";
import bookingRoutes from "./routes/booking.routes.js";

import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the MBS");
});

// Database connection and admin creation
const startServer = async () => {
  try {
    // 1. Connect to database
    await connectToDatabase();
    console.log("Connected to MongoDB");

    // 2. Create admin user if doesn't exist
    const createAdminUser = async () => {
      const adminEmail = process.env.ADMIN_EMAIL;

      if (!adminEmail || !process.env.ADMIN_PASSWORD) {
        console.warn("ADMIN_EMAIL or ADMIN_PASSWORD not set in .env");
        return;
      }

      const adminExists = await User.findOne({ email: adminEmail });

      if (!adminExists) {
        const hashedPassword = await bcrypt.hash(
          process.env.ADMIN_PASSWORD,
          12
        );

        await User.create({
          firstName: "Admin",
          lastName: "User",
          email: adminEmail,
          password: hashedPassword,
          isAdmin: true,
          termsAccepted: true,
          address: "Admin Address", // Required by your schema
          phoneNumber: "0000000000", // Required by your schema
        });

        console.log("Admin user created successfully");
      }
    };

    await createAdminUser();

    // 3. Start server
    app.listen(PORT, () => {
      console.log(`API is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

// Start the application
startServer();

export default app;
