import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ManageShowPage() {
  // State for tab selection
  const [activeTab, setActiveTab] = useState('current');
  
  // State for form visibility
  const [showAddForm, setShowAddForm] = useState(false);
  
  // State for new movie form
  const [newMovie, setNewMovie] = useState({
    title: '',
    runtime: '',
    type: 'action',
    synopsis: '',
    director: '',
    cast: '',
    poster: '',
    ticketPrice: '12.99',
    status: 'current' // 'current' or 'upcoming'
  });

  // Sample data - will be replaced with backend API calls
  const [movies, setMovies] = useState({
    current: [
      {
        id: 1,
        title: 'Dune: Part Two',
        runtime: '166 min',
        type: 'sci-fi',
        synopsis: 'Paul Atreides unites with the Fremen to seek revenge against those who destroyed his family.',
        director: 'Denis Villeneuve',
        cast: 'Timothée Chalamet, Zendaya, Rebecca Ferguson',
        poster: '/src/assets/movie1.jpg',
        ticketPrice: 12.99
      }
    ],
    upcoming: [
      {
        id: 2,
        title: 'Furiosa: A Mad Max Saga',
        runtime: '150 min',
        type: 'action',
        synopsis: 'The origin story of renegade warrior Furiosa before she teamed up with Mad Max.',
        director: 'George Miller',
        cast: 'Anya Taylor-Joy, Chris Hemsworth, Tom Burke',
        poster: '/src/assets/movie1.jpg',
        ticketPrice: 12.99
      }
    ]
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie(prev => ({ ...prev, [name]: value }));
  };

  // Handle image upload (simplified - in real app would upload to server)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMovie(prev => ({ ...prev, poster: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new movie
  const handleAddMovie = () => {
    const movieToAdd = {
      ...newMovie,
      id: Date.now(), // Temporary ID
      ticketPrice: parseFloat(newMovie.ticketPrice)
    };

    setMovies(prev => ({
      ...prev,
      [newMovie.status]: [...prev[newMovie.status], movieToAdd]
    }));

    // Reset form
    setNewMovie({
      title: '',
      runtime: '',
      type: 'action',
      synopsis: '',
      director: '',
      cast: '',
      poster: '',
      ticketPrice: '12.99',
      status: 'current'
    });
    setShowAddForm(false);
  };

  // Delete movie
  const handleDeleteMovie = (id, status) => {
    setMovies(prev => ({
      ...prev,
      [status]: prev[status].filter(movie => movie.id !== id)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Manage Movies</h1>
          <Link
            to="/adminHomePage"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            ← Back to Admin Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('current')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'current' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Currently Playing
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'upcoming' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Upcoming Movies
            </button>
          </nav>
        </div>

        {/* Add Movie Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Movie
          </button>
        </div>

        {/* Add Movie Form (Modal-like) */}
        {showAddForm && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8 p-6 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Movie</h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Movie Title</label>
                <input
                  type="text"
                  name="title"
                  value={newMovie.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Runtime (minutes)</label>
                <input
                  type="text"
                  name="runtime"
                  value={newMovie.runtime}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Genre</label>
                <select
                  name="type"
                  value={newMovie.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="action">Action</option>
                  <option value="comedy">Comedy</option>
                  <option value="drama">Drama</option>
                  <option value="horror">Horror</option>
                  <option value="sci-fi">Sci-Fi</option>
                  <option value="thriller">Thriller</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Ticket Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  name="ticketPrice"
                  value={newMovie.ticketPrice}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Director</label>
                <input
                  type="text"
                  name="director"
                  value={newMovie.director}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Cast (comma separated)</label>
                <input
                  type="text"
                  name="cast"
                  value={newMovie.cast}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Synopsis</label>
                <textarea
                  name="synopsis"
                  rows={3}
                  value={newMovie.synopsis}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Movie Poster</label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="py-2 px-3 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                {newMovie.poster && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Image selected</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={newMovie.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="current">Currently Playing</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddMovie}
                disabled={!newMovie.title || !newMovie.runtime}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Movie
              </button>
            </div>
          </div>
        )}

        {/* Movies List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {activeTab === 'current' ? 'Currently Playing Movies' : 'Upcoming Movies'}
            </h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {movies[activeTab].length > 0 ? (
              movies[activeTab].map((movie) => (
                <li key={movie.id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                      {movie.poster ? (
                        <img 
                          className="h-32 w-24 object-cover rounded" 
                          src={movie.poster} 
                          alt={`${movie.title} poster`} 
                        />
                      ) : (
                        <div className="h-32 w-24 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h4 className="text-lg font-medium text-gray-900 truncate">{movie.title}</h4>
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          ${movie.ticketPrice.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{movie.runtime} • {movie.type}</p>
                      <p className="text-sm text-gray-500 mt-1">Director: {movie.director}</p>
                      <p className="text-sm text-gray-500 mt-1">Cast: {movie.cast}</p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{movie.synopsis}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-4">
                      <button
                        onClick={() => handleDeleteMovie(movie.id, activeTab)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-6 text-center text-gray-500">
                No {activeTab === 'current' ? 'currently playing' : 'upcoming'} movies found
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}