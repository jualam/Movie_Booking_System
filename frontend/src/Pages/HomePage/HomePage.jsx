import { useNavigate } from "react-router-dom";
import { FaFilm, FaSearch, FaTicketAlt, FaUser, FaCalendarAlt } from "react-icons/fa";

function HomePage() {
    const navigate = useNavigate();
  
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
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
    );
  }
  
export default HomePage;

//Card componenet
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
