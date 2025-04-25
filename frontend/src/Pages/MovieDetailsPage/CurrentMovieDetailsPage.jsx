import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const CurrentMovieDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5500/api/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch movie details');
        }

        if (data.success) {
          setMovie(data.data);
        } else {
          throw new Error('Movie not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Handle booking button click
  const handleBookNow = () => {
    navigate(`/ticketBooking/${id}`);
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Movie not found</div>
      </div>
    );
  }

  // Converting runtime from minutes to hour minutes format
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
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-purple-400 hover:text-purple-300 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Movies
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src={movie.imageUrl} 
                alt={movie.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-2 py-1 bg-gray-700 rounded text-sm">R</span>
              <span>{formatRuntime(movie.runtime)}</span>
              <span>{movie.genre.join(', ')}</span>
            </div>
            <div className="flex space-x-4 mb-8">
              <button 
                onClick={handleBookNow}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
              >
                Book Tickets
              </button>
            </div>

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
                  <p className="text-gray-300">{movie.cast.join(', ')}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Ticket Price</h3>
                  <p className="text-gray-300">${movie.ticketPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Reviews</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                      <span className="text-sm font-medium">JA</span>
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
                    One of the greatest films ever made. The story of hope and friendship is timeless. I would recommend this film to anyone.
                  </p>
                </div>

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

export default CurrentMovieDetailsPage;