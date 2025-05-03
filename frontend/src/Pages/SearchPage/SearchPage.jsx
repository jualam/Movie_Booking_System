import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5500/api/movies/search?query=${encodeURIComponent(query)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setSearchResults(data.data);
      } else {
        console.error('Search failed');
      }
      setSearched(true);
    } catch (error) {
      console.error('Error during search:', error);
      setSearched(true);
    }
  };

  const handleBookNowClick = (e, movieId) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/ticketBooking/${movieId}`);
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Movie Booking System</h1>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/homePage" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link to="/browseCurrent" className="hover:text-purple-400 transition-colors">Now Playing</Link>
            <Link to="/browseUpcoming" className="hover:text-purple-400 transition-colors">Coming Soon</Link>
            <Link to="/profile" className="hover:text-purple-400 transition-colors">Profile</Link>
            <Link to="/orderHistory" className="hover:text-purple-400 transition-colors">Order History</Link>
          </nav>
          <div className="md:hidden">
            <button className="text-xl">☰</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 md:px-8">
        {/* Search Bar */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Search</h2>
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="py-2 pl-4 pr-10 bg-gray-800 rounded-full text-white w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} className="absolute right-3 top-2.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* before searching anything */}
        {!searched && (
          <div className="text-center text-gray-400 mt-10">
            Search a movie you want to watch.
          </div>
        )}

        {/* if no searched moviess found */}
        {searched && searchResults.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            No movies found for "{query}"
          </div>
        )}

        {/* Result drid structure */}
        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((movie) => (
              <div
                key={movie._id}
                className="group bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20"
              >
                <Link to={`/${movie.status === 'currently_playing' ? 'currentMovieDetails' : 'upcomingMovieDetails'}/${movie._id}`}>
                  <div className="relative">
                    <img
                      src={movie.imageUrl}
                      alt={movie.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className={`absolute top-2 right-2 text-white px-2 py-1 rounded-md text-xs font-semibold capitalize 
                      ${movie.status === 'currently_playing' ? 'bg-green-600' : 'bg-purple-600'}`}>
                      {movie.status === 'currently_playing' ? (
                        <span>Now Playing</span>
                      ) : (
                        <span>Coming Soon</span>
                      )}
                    </div> 
                    {/* Book Now Button (only for current movies) */}
                    {movie.status === 'currently_playing' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-4 w-full">
                          <button
                            className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-medium transition-colors"
                            onClick={(e) => handleBookNowClick(e, movie._id)}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-center h-8 truncate" title={movie.title}>
                      {movie.title}
                    </h3>
                    <div className="flex justify-center items-center mt-2 space-x-4">
                      <span className="text-sm text-gray-400">{formatRuntime(movie.runtime)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;