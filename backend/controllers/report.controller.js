import Ticket from "../models/ticket.model.js";
import Movie from "../models/movie.model.js";

// Get daily ticket sales with current movie titles
export const getDailyTicketSales = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // 1. Get daily ticket sales
    const tickets = await Ticket.aggregate([
      {
        $match: {
          createdAt: { $gte: today, $lt: tomorrow },
        },
      },
      {
        $group: {
          _id: "$movie",
          totalTickets: { $sum: "$quantity" },
          totalRevenue: { $sum: { $multiply: ["$quantity", 12.99] } },
        },
      },
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "_id",
          as: "movie",
        },
      },
      {
        $unwind: "$movie",
      },
      {
        $project: {
          movieTitle: "$movie.title",
          totalTickets: 1,
          totalRevenue: 1,
        },
      },
    ]);

    // 2. Get just titles of currently playing movies
    const currentMovieTitles = await Movie.find({ status: "currently_playing" })
      .select("title -_id") // Only get title field, exclude _id
      .lean();

    // Calculate totals
    const totalRevenue = tickets.reduce(
      (sum, item) => sum + item.totalRevenue,
      0
    );
    const totalTicketsSold = tickets.reduce(
      (sum, item) => sum + item.totalTickets,
      0
    );

    res.status(200).json({
      success: true,
      date: today.toDateString(),
      report: {
        totalTicketsSold,
        totalRevenue,
        salesByMovie: tickets,
      },
      currentMovies: currentMovieTitles, // Just array of titles
    });
  } catch (error) {
    next(error);
  }
};
