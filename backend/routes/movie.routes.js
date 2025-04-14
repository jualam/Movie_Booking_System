import express from "express";
import {
  addMovie,
  getCurrentMovies,
  getUpcomingMovies,
  searchMovies,
  getMovieDetails,
} from "../controllers/movie.controller.js";
import { requireAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

// Public routes
router.get("/current", getCurrentMovies);
router.get("/upcoming", getUpcomingMovies);
router.get("/search", searchMovies);
router.get("/:id", getMovieDetails);

// Admin routes
router.post("/", requireAdmin, addMovie);

export default router;
