import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UpcomingMovieDetailsPage = () => {
  const navigate = useNavigate();
  //for now just using shawshank
  const movie = {
    id: 1,
    title: "A Beautyful Mind",
    year: 2001,
    rating: "R",
    runtime: "2h 15m",
    genre: "DocuDrama",
    director: "Ron Howard",
    cast: "Russell Crowe, Ed Harris, Jennifer Connelly",
    synopsis: "A mathematical genius, John Nash made an astonishing discovery early in his career and stood on the brink of international acclaim. But the handsome and arrogant Nash soon found himself on a harrowing journey of self-discovery.",
    imagePath: "/src/assets/movie6.jpg" 
  };

  // Handle booking button click
  const handleBookNow = () => {
    navigate(`/ticketBooking/${movie.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* same as current mvies page */}
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
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-purple-400 hover:text-purple-300 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Movies
        </button>

        {/* Movie Details Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Movie Poster */}
          <div className="w-full lg:w-1/3">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src={movie.imagePath} 
                alt={movie.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Movie Info */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title} <span className="text-gray-400">({movie.year})</span></h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-2 py-1 bg-gray-700 rounded text-sm">{movie.rating}</span>
              <span>{movie.runtime}</span>
              <span>{movie.genre}</span>
            </div>

            {/* Movie Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
                <p className="text-gray-300">{movie.synopsis}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Director</h3>
                  <p className="text-gray-300">{movie.director}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Cast</h3>
                  <p className="text-gray-300">{movie.cast}</p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Reviews</h2>
              
              {/* Sample Reviews */}
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                      <span className="text-sm font-medium">JD</span>
                    </div>
                    <h4 className="font-medium">Juhair Alam</h4>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-5 h-5 ${i < 5 ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300">
                    One of the greatest films ever made. The story of hope and friendship is timeless. I would remommend this film to anyone.
                  </p>
                </div>

                {/* Add Review Form */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                  <textarea 
                    className="w-full bg-gray-800 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows="4"
                    placeholder="Share your thoughts about this movie..."
                  ></textarea>
                  <button className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpcomingMovieDetailsPage;