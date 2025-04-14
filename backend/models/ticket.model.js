import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
    },
    theatre: {
      type: String,
      enum: [
        "Lubbock",
        "Amarillo",
        "Levelland",
        "Plainview",
        "Snyder",
        "Abilene",
      ],
      required: true,
    },
    showtime: {
      type: String,
      enum: ["10:00am", "1:30pm", "4:00pm", "6:30pm", "9:00pm"],
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Venmo", "PayPal"],
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
