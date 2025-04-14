import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    genre: {
      type: [String],
      required: [true, "At least one genre is required"],
      enum: [
        "Action",
        "Comedy",
        "Drama",
        "Horror",
        "Sci-Fi",
        "Romance",
        "Thriller",
        "Animation",
        "Documentary",
      ],
    },
    duration: {
      type: Number, // in minutes
      required: [true, "Duration is required"],
    },
    releaseDate: {
      type: Date,
      required: [true, "Release date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    director: {
      type: String,
      required: [true, "Director is required"],
    },
    cast: {
      type: [String],
      required: [true, "At least one cast member is required"],
    },
    posterUrl: {
      type: String,
      required: [true, "Poster URL is required"],
    },
    trailerUrl: {
      type: String,
      required: [true, "Trailer URL is required"],
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    status: {
      type: String,
      enum: ["now_playing", "upcoming", "archived"],
      default: "upcoming",
    },
    ticketPrice: {
      type: Number,
      required: [true, "Ticket price is required"],
      min: [0, "Price can't be negative"],
    },
  },
  { timestamps: true }
);

// Indexes for better search performance
movieSchema.index({ title: "text", genre: "text", cast: "text" });

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
