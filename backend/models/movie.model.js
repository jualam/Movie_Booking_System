import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      unique: true,
    },
    synopsis: {
      type: String,
      required: [true, "Synopsis is required"],
    },
    runtime: {
      type: Number, // in minutes
      required: [true, "Runtime is required"],
    },
    genre: {
      type: [String],
      required: [true, "At least one genre is required"],
      enum: [
        "Action",
        "Comedy",
        "Adventure",
        "Drama",
        "Horror",
        "Sci-Fi",
        "Romance",
        "Thriller",
        "Animation",
        "Documentary",
      ],
    },
    ticketPrice: {
      type: Number,
      required: true,
      default: 12.99,
    },
    director: {
      type: String,
      required: [true, "Director is required"],
    },
    cast: {
      type: [String],
      required: [true, "At least one cast member is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    status: {
      type: String,
      enum: ["currently_playing", "upcoming"],
      default: "currently_playing",
      required: true,
    },
  },
  { timestamps: true }
);

// Indexes for better search performance
movieSchema.index({ title: "text", genre: "text", cast: "text" });

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
