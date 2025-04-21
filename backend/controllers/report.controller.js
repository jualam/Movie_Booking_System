import Ticket from "../models/ticket.model.js";

// Get daily ticket sales
export const getDailyTicketSales = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

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
          totalRevenue: { $sum: { $multiply: ["$quantity", 12.99] } }, // Assuming $10 per ticket
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

    const totalSales = tickets.reduce(
      (sum, item) => sum + item.totalRevenue,
      0
    );

    res.status(200).json({
      success: true,
      date: today.toDateString(),
      totalTicketsSold: tickets.reduce(
        (sum, item) => sum + item.totalTickets,
        0
      ),
      totalRevenue: totalSales,
      salesByMovie: tickets,
    });
  } catch (error) {
    next(error);
  }
};
