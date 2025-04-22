import express from "express";
import {
  addMovie,
  deleteMovie,
  getCurrentMovies,
  getUpcomingMovies,
  searchMovies,
  getMovieDetails,
} from "../controllers/movie.controller.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.js"; // This is your Cloudinary upload middleware

const router = express.Router();

// Public routes
router.get("/current", getCurrentMovies);
router.get("/upcoming", getUpcomingMovies);
router.get("/search", searchMovies);
router.get("/:id", getMovieDetails);

// Admin routes
router.post("/", authenticate, requireAdmin, upload.single("image"), addMovie);
router.delete("/:id", authenticate, requireAdmin, deleteMovie);

export default router;
