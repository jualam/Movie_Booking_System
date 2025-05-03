import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const TicketBookingPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [formData, setFormData] = useState({
    theater: "",
    showtime: "",
    tickets: 1,
  });

  useEffect(() => {
    console.log("Movie ID from URL:", movieId);
  }, [movieId]);

  const theaters = [
    "Lubbock",
    "Amarillo",
    "Levelland",
    "Plainview",
    "Snyder",
    "Abilene",
  ];
  const showtimes = ["10:00am", "1:30pm", "4:00pm", "6:30pm", "9:00pm"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Movie ID:", movieId);

    if (!movieId) {
      alert("Movie ID is missing. Please try again.");
      navigate("/browseCurrent");
      return;
    }

    if (!formData.theater || !formData.showtime || !formData.tickets) {
      alert("Please fill in all fields");
      return;
    }

    navigate("/payment", {
      state: {
        movieId: movieId,
        theatre: formData.theater,
        showtime: formData.showtime,
        quantity: formData.tickets,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <div className="text-center mb-6 sm:mb-2">
        <h2 className="text-2xl font-bold text-gray-900">Book Tickets</h2>
        <p className="text-gray-600 text-sm mt-2">
          Select your preferred options
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Theater selection */}
          <div>
            <label className="text-gray-800 text-sm font-medium mb-2 block">
              Theater Location
            </label>
            <select
              name="theater"
              value={formData.theater}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:outline-blue-500"
            >
              <option value="">Select a theater</option>
              {theaters.map((theater) => (
                <option key={theater} value={theater}>
                  {theater}
                </option>
              ))}
            </select>
          </div>

          {/* Showtime */}
          <div>
            <label className="text-gray-800 text-sm font-medium mb-2 block">
              Showtime
            </label>
            <select
              name="showtime"
              value={formData.showtime}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:outline-blue-500"
            >
              <option value="">Select a showtime</option>
              {showtimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Tickets */}
          <div>
            <label className="text-gray-800 text-sm font-medium mb-2 block">
              Number of Tickets (Max 10)
            </label>
            <input
              type="number"
              name="tickets"
              min="1"
              max="10"
              value={formData.tickets}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:outline-blue-500"
            />
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">
                Tickets ({formData.tickets} x $12.99)
              </span>
              <span className="text-gray-800 font-medium">
                ${(formData.tickets * 12.99).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-semibold border-t border-gray-200 pt-2 mt-2">
              <span className="text-gray-800">Total</span>
              <span className="text-blue-600">
                ${(formData.tickets * 12.99).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 px-6 text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
            >
              Proceed to Payment
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          <Link
            to={`/browseCurrent`}
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to movies
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TicketBookingPage;
