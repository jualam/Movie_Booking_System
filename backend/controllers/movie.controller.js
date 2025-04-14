import Movie from "../models/movie.model.js";

// Add new movie (Admin only)
export const addMovie = async (req, res, next) => {
  try {
    const movieData = req.body;

    // Check if movie exists
    const existingMovie = await Movie.findOne({ title: movieData.title });

    if (existingMovie) {
      // Update existing movie
      const updatedMovie = await Movie.findByIdAndUpdate(
        existingMovie._id,
        movieData,
        { new: true, runValidators: true }
      );

      return res.status(200).json({
        success: true,
        message: "Movie updated successfully",
        data: updatedMovie,
      });
    }

    // Create new movie if doesn't exist
    const newMovie = await Movie.create(movieData);

    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      data: newMovie,
    });
  } catch (error) {
    next(error);
  }
};

// Get currently playing movies (5 movies)
export const getCurrentMovies = async (req, res, next) => {
  try {
    const currentMovies = await Movie.find({
      status: "now_playing",
      releaseDate: { $lte: new Date() },
      endDate: { $gte: new Date() },
    }).limit(5);

    res.status(200).json({
      success: true,
      count: currentMovies.length,
      data: currentMovies,
    });
  } catch (error) {
    next(error);
  }
};

// Get upcoming movies (5 movies)
export const getUpcomingMovies = async (req, res, next) => {
  try {
    const upcomingMovies = await Movie.find({
      status: "upcoming",
      releaseDate: { $gt: new Date() },
    })
      .sort({ releaseDate: 1 })
      .limit(5);

    res.status(200).json({
      success: true,
      count: upcomingMovies.length,
      data: upcomingMovies,
    });
  } catch (error) {
    next(error);
  }
};

// Search all movies (15 movies)
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
      .limit(15);

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
