import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UpcomingMoviesPage = () => {
  const navigate = useNavigate();
  const movies = [
    { id: 1, imagePath: '/src/assets/movie6.jpg', title: '' },
    { id: 2, imagePath: '/src/assets/movie7.jpg', title: '' },
    { id: 3, imagePath: '/src/assets/movie8.jpg', title: '' },
    { id: 4, imagePath: '/src/assets/movie9.jpg', title: '' },
    { id: 5, imagePath: '/src/assets/movie10.jpg', title: '' },
  ];

  // Function to handle booking button click without mistakenly clicking movie card
  const handleBookNowClick = (e, movieId) => {
    e.preventDefault(); // Prevent navigating to movie details
    e.stopPropagation(); // Stop event bubbling
    navigate(`/ticketBooking/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Movie Booking System</h1>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/homePage" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link to="/browseCurrent" className="text-purple-400 font-medium">Now Playing</Link>
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

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div 
              key={movie.id}
              className="group bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20"
            >
              {/* click to go to movie details,using static id fr now*/}
              <Link to={`/upcomingMovieDetails/${movie.id}`}>
                <div className="relative">
                  <img 
                    src={movie.imagePath} 
                    alt="Movie poster" 
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-center h-8">
                    {movie.title || "Movie Title"}
                  </h3>
                  <div className="flex justify-center items-center mt-2">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="text-sm text-gray-400 ml-1">PG-13</span>
                    </div>
                    <span className="mx-2 text-gray-600">•</span>
                    <span className="text-sm text-gray-400">2h 30m</span>
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