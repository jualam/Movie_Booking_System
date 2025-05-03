import { useNavigate } from "react-router-dom"; 
import { FaFilm, FaSearch, FaTicketAlt, FaUser, FaCalendarAlt } from "react-icons/fa";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <div className="flex justify-between items-center px-8 py-4">
        <div></div> 
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">Sign Out</button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-extrabold tracking-wide text-gray-200 drop-shadow-lg">
          🎬 Movie Booking System
        </h1>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <Card
            icon={<FaFilm size={30} />}
            title="Browse Current Movies"
            onClick={() => navigate("/browseCurrent")}
          />
          <Card
            icon={<FaCalendarAlt size={30} />}
            title="Browse Upcoming Movies"
            onClick={() => navigate("/browseUpcoming")}
          />
          <Card
            icon={<FaSearch size={30} />}
            title="Search Movies"
            onClick={() => navigate("/search")}
          />
          <Card
            icon={<FaTicketAlt size={30} />}
            title="Order History"
            onClick={() => navigate("/orderHistory")}
          />
          <Card
            icon={<FaUser size={30} />}
            title="View Profile"
            onClick={() => navigate("/profile")}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

// card 
function Card({ icon, title, onClick }) {
  return (
    <div
      className="flex flex-col items-center justify-center w-48 h-48 p-4 bg-gray-800 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-700 cursor-pointer"
      onClick={onClick}
    >
      <div className="text-indigo-400">{icon}</div>
      <h2 className="mt-4 text-lg font-semibold text-gray-300">{title}</h2>
    </div>
  );
}
