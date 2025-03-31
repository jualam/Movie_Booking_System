import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();
  
  // im keeping it static for now for demo
  const searchResults = [
    { 
      id: 1, 
      imagePath: '/src/assets/movie1.jpg', 
      title: 'The Shawshank Redemption',
      type: 'current',
      rating: 'R',
      runtime: '2h 15m'
    },
    { 
      id: 2, 
      imagePath: '/src/assets/movie2.jpg', 
      title: 'The Godfather',
      type: 'current',
      rating: 'R',
      runtime: '2h 55m'
    },
    { 
      id: 3, 
      imagePath: '/src/assets/movie3.jpg', 
      title: 'Fight Club',
      type: 'upcoming',
      rating: 'PG-13',
      runtime: '2h 46m'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Same header r */}
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
        {/* Search Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Search Results</h2>
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search movies..."
              className="py-2 pl-4 pr-10 bg-gray-800 rounded-full text-white w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              defaultValue="shawshank" // just wrote shashank here to show the search functionality(static)
            />
            <button className="absolute right-3 top-2.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((movie) => (
            <div 
              key={movie.id}
              className="group bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20"
            >
              <Link to={`/movieDetails/${movie.id}`}>
                <div className="relative">
                  <img 
                    src={movie.imagePath} 
                    alt={movie.title} 
                    className="w-full h-80 object-cover"
                  />
                  {movie.type === 'upcoming' && ( //if movie is upcomming we will show a tag
                    <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-md text-xs">
                      Coming Soon
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-center">{movie.title}</h3>
                  <div className="flex justify-center items-center mt-2 space-x-2">
                    <span className="text-sm text-gray-400">{movie.rating}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-sm text-gray-400">{movie.runtime}</span>
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

export default SearchPage;