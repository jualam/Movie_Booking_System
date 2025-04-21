import express from "express";
import {
  addMovie,
  updateMovie,
  deleteMovie,
  getCurrentMovies,
  getUpcomingMovies,
  searchMovies,
  getMovieDetails,
} from "../controllers/movie.controller.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/current", authenticate, getCurrentMovies);
router.get("/upcoming", authenticate, getUpcomingMovies);
router.get("/search", authenticate, searchMovies);
router.get("/:id", authenticate, getMovieDetails);

// Admin routes
router.post("/", requireAdmin, addMovie);
// Add these routes to movie.routes.js
router.put("/:id", requireAdmin, updateMovie);
router.delete("/:id", requireAdmin, deleteMovie);

export default router;
