import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5500/api/movies/upcoming', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch upcoming movies');
        }

        if (data.success) {
          setMovies(data.data);
        } else {
          throw new Error('No upcoming movies found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading upcoming movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  // minutes to hour minutes
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <header className="py-6 px-4 md:px-8 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Movie Booking System</h1>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/homePage" className={`hover:text-purple-400 transition-colors ${location.pathname === '/homePage' ? 'text-purple-400 font-medium' : ''}`}>Home</Link>
            <Link to="/browseCurrent" className={`hover:text-purple-400 transition-colors ${location.pathname === '/browseCurrent' ? 'text-purple-400 font-medium' : ''}`}>Now Playing</Link>
            <Link to="/browseUpcoming" className={`hover:text-purple-400 transition-colors ${location.pathname === '/browseUpcoming' ? 'text-purple-400 font-medium' : ''}`}>Coming Soon</Link>
            <Link to="/profile" className={`hover:text-purple-400 transition-colors ${location.pathname === '/profile' ? 'text-purple-400 font-medium' : ''}`}>Profile</Link>
            <Link to="/orderHistory" className={`hover:text-purple-400 transition-colors ${location.pathname === '/orderHistory' ? 'text-purple-400 font-medium' : ''}`}>Order History</Link>
          </nav>
          <div className="md:hidden">
            <button className="text-xl">☰</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Upcoming Movies</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="py-2 px-4 bg-gray-800 rounded-full text-white w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="absolute right-3 top-2.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div 
              key={movie._id}
              className="group bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20"
            >
              <Link to={`/upcomingMovieDetails/${movie._id}`}>
                <div className="relative">
                  <img 
                    src={movie.imageUrl} 
                    alt={movie.title} 
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-center h-8 truncate" title={movie.title}>
                    {movie.title}
                  </h3>
                  <div className="flex justify-center items-center mt-2">
                    {/* change made: faiaz->convertig minutes to hour and minutes  */}
                    <span className="text-sm text-gray-400">{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UpcomingMoviesPage;