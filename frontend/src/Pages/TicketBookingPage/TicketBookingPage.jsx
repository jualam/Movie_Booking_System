import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TicketBookingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    theater: '',
    showtime: '',
    tickets: 1,
  });

  // Mock data - replace with your actual data
  const theaters = ['Lubbock', 'Amarillo', 'Levelland', 'Plainview', 'Snyder', 'Abilene'];
  const showtimes = ['10:00 AM', '1:30 PM', '4:00 PM', '6:30 PM', '9:00 PM'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking details:', formData);
    navigate('/payment');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <div className="text-center mb-6 sm:mb-2">
        <h2 className="text-2xl font-bold text-gray-900">Book Tickets</h2>
        <p className="text-gray-600 text-sm mt-2">Select your preferred options</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Theaterselection */}
          <div>
            <label className="text-gray-800 text-sm font-medium mb-2 block">Theater Location</label>
            <select
              name="theater"
              value={formData.theater}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent focus:outline-blue-500 transition-all appearance-none"
            >
              <option value="">Select a theater</option>
              {theaters.map(theater => (
                <option key={theater} value={theater}>{theater}</option>
              ))}
            </select>
          </div>

          {/* Showtimes,just added some as sample */}
          <div>
            <label className="text-gray-800 text-sm font-medium mb-2 block">Showtime</label>
            <select
              name="showtime"
              value={formData.showtime}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent focus:outline-blue-500 transition-all appearance-none"
            >
              <option value="">Select a showtime</option>
              {showtimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          {/* Number of Tickets max 10 */}
          <div>
            <label className="text-gray-800 text-sm font-medium mb-2 block">Number of Tickets (Max 10)</label>
            <input
              type="number"
              name="tickets"
              min="1"
              max="10"
              value={formData.tickets}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent focus:outline-blue-500 transition-all"
            />
          </div>

          {/* Price Summary,set 134 as example */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Tickets ({formData.tickets} x $12.99)</span>
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

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 px-6 text-sm font-medium tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Proceed to Payment
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          <Link to="/movieDetails/1" className="text-blue-600 hover:text-blue-700">
            ← Back to movie details
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TicketBookingPage;