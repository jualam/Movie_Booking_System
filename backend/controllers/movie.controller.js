import Movie from "../models/movie.model.js";
import Ticket from "../models/ticket.model.js";
import cloudinary from "../config/cloudinary.js";

// Add new movie (Admin only)
export const addMovie = async (req, res) => {
  try {
    const {
      title,
      synopsis,
      runtime,
      genre,
      director,
      cast,
      status,
      ticketPrice,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !synopsis ||
      !runtime ||
      !genre ||
      !director ||
      !cast ||
      !status ||
      !req.file ||
      !ticketPrice
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    //debugging
    console.log("📦 req.body:", req.body);
    console.log("🖼️ req.file:", req.file);

    // Create movie with Cloudinary URL
    const newMovie = await Movie.create({
      title,
      synopsis,
      runtime: parseInt(runtime),
      genre: genre.split(",").map((g) => g.trim()), // Convert comma-separated string to array
      director,
      cast: cast.split(",").map((c) => c.trim()),
      status,
      imageUrl: req.file.path, // Cloudinary URL
      ticketPrice: parseFloat(ticketPrice) || 12.99, // Fixed price
    });

    res.status(201).json({
      success: true,
      data: newMovie,
    });
  } catch (error) {
    console.error("FULL ERROR STACK:");
    console.error(error); // raw object
    console.error(error.message); // readable message
    console.error(error.stack); // trace
    res.status(500).json({
      message: "Failed to add movie",
      error: error.message || error.toString(),
    });
  }
};

// Get currently playing movies
export const getCurrentMovies = async (req, res, next) => {
  try {
    const currentMovies = await Movie.find({ status: "currently_playing" })
      .limit(10)
      .select(
        "title synopsis runtime genre director cast ticketPrice imageUrl"
      ); // Added all fields

    res.status(200).json({
      success: true,
      count: currentMovies.length,
      data: currentMovies,
    });
  } catch (error) {
    next(error);
  }
};

// Get upcoming movies
export const getUpcomingMovies = async (req, res, next) => {
  try {
    const upcomingMovies = await Movie.find({ status: "upcoming" })
      .sort({ createdAt: -1 })
      .limit(10)
      .select(
        "title synopsis runtime genre director cast ticketPrice imageUrl"
      );

    res.status(200).json({
      success: true,
      count: upcomingMovies.length,
      data: upcomingMovies,
    });
  } catch (error) {
    next(error);
  }
};

// Search movies
export const searchMovies = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const movies = await Movie.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(3)
      .select("title synopsis runtime genre imageUrl status");

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

// Get movie details by ID
export const getMovieDetails = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a movie
export const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    // Delete image from Cloudinary
    if (movie.imageUrl) {
      const publicId = movie.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`movie-posters/${publicId}`);
    }

    // Delete movie and associated tickets
    await Movie.findByIdAndDelete(id);
    await Ticket.deleteMany({ movie: id });

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
