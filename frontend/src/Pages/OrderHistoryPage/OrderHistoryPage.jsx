import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function OrderHistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5500/api/bookings/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setBookings(data.bookings);
        }
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <header className="py-6 px-4 md:px-8 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Movie Booking System</h1>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/homePage" className="hover:text-purple-400">Home</Link>
            <Link to="/browseCurrent" className="hover:text-purple-400">Now Playing</Link>
            <Link to="/browseUpcoming" className="hover:text-purple-400">Coming Soon</Link>
            <Link to="/profile" className="hover:text-purple-400">Profile</Link>
            <Link to="/orderHistory" className="text-purple-400 font-medium">Order History</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-10 px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-8">Your Tickets</h2>

        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>You haven't purchased any tickets yet</p>
            <Link
              to="/browseCurrent"
              className="mt-4 inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-700"
              >
                <div className="p-4 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{ticket.movie}</h3>
                    <p className="text-sm text-gray-400">{ticket.theatre}</p>
                    <div className="mt-2 text-sm text-gray-300">
                      <p><strong>Date:</strong> {new Date(ticket.bookingDate).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {ticket.showtime}</p>
                      <p><strong>Tickets:</strong> {ticket.totalTickets}</p>
                      <p><strong>Order #:</strong> {ticket.ticketNumber}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <img
                      src={ticket.qrCode}
                      alt="QR Code"
                      className="w-20 h-20 object-contain border border-gray-600 rounded"
                    />
                    <Link
                      to={`/viewTicket/${ticket.id}`}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default OrderHistoryPage;
