import Ticket from "../models/ticket.model.js";
import Movie from "../models/movie.model.js";

export const bookTickets = async (req, res, next) => {
  try {
    const {
      movieId,
      theatre,
      showtime,
      quantity,
      paymentMethod,
      paymentDetails,
    } = req.body;
    const userId = req.userId; // From auth middleware

    // Validate inputs
    if (!movieId || !theatre || !showtime || !quantity || !paymentMethod) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (quantity < 1 || quantity > 10) {
      return res.status(400).json({ error: "Quantity must be between 1-10" });
    }

    // Verify movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Generate unique ticket number (12-digit alphanumeric)
    const generateTicketNumber = () => {
      return (
        Math.random().toString(36).substring(2, 8) +
        Math.random().toString(36).substring(2, 8)
      );
    };

    // Generate one ticket number
    const ticketNumber = generateTicketNumber();

    const ticket = await Ticket.create({
      movie: movieId,
      user: userId,
      ticketNumber,
      theatre,
      showtime,
      quantity, // store full quantity here
      paymentMethod,
    });

    const response = {
      success: true,
      message: `${quantity} ticket(s) booked successfully`,
      bookingDetails: {
        movie: movie.title,
        theatre,
        showtime,
        totalTickets: quantity,
        ticketNumber,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketNumber}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getBookingHistory = async (req, res, next) => {
  try {
    const userId = req.userId;

    const bookings = await Ticket.find({ user: userId })
      .populate("movie", "title posterUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings: bookings.map((b) => ({
        id: b._id,
        movie: b.movie.title,
        poster: b.movie.posterUrl,
        theatre: b.theatre,
        showtime: b.showtime,
        ticketNumber: b.ticketNumber,
        totalTickets: b.quantity,
        bookingDate: b.createdAt,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${b.ticketNumber}`,
      })),
    });
  } catch (error) {
    next(error);
  }
};
