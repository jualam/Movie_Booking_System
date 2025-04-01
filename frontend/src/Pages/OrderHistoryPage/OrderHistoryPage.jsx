import { Link } from "react-router-dom";
import movie1 from "../../assets/movie1.jpg";
import movie2 from "../../assets/movie2.jpg";
import movie3 from "../../assets/movie3.jpg";

const orders = [
  { id: "12345", movie: "Avengers", date: "04-01-2025", used: false, image: movie1 },
  { id: "67890", movie: "Inception", date: "03-25-2025", used: true, image: movie2 },
  { id: "54321", movie: "Interstellar", date: "03-18-2025", used: true, image: movie3 },
];

function OrderHistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* same Header as other pages*/}
      <header className="py-6 px-4 md:px-8 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Movie Booking System</h1>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/homePage" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link to="/browseCurrent" className="hover:text-purple-400 transition-colors">Now Playing</Link>
            <Link to="/browseUpcoming" className="hover:text-purple-400 transition-colors">Coming Soon</Link>
            <Link to="/profile" className="hover:text-purple-400 transition-colors">Profile</Link>
            <Link to="/orderHistory" className="text-purple-400 font-medium">Order History</Link>
          </nav>
          <div className="md:hidden">
            <button className="text-xl">☰</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Your Tickets</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div 
              key={order.id}
              className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg relative ${order.used ? 'opacity-70' : ''}`}
            >
              {/* Movie Poster */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={order.image} 
                  alt={order.movie} 
                  className="w-full h-full object-cover"
                />
                {order.used && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <span className="text-2xl font-bold text-red-400 transform rotate-[-15deg]">
                      TICKET USED
                    </span>
                  </div>
                )}
              </div>

              {/* Order Details */}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{order.movie}</h3>
                <div className="flex justify-between text-sm text-gray-400 mb-3">
                  <span>Order #{order.id}</span>
                  <span>{new Date(order.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>

                <Link
                  to={`/viewTicket/${order.id}`}
                  className="block w-full py-2 text-center rounded-md font-medium transition-colors bg-purple-600 hover:bg-purple-700 text-white"
                >
                  View Ticket
                </Link>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">You haven't purchased any tickets yet</p>
            <Link 
              to="/browseCurrent" 
              className="mt-4 inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white"
            >
              Browse Movies
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default OrderHistoryPage;