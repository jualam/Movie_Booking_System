import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ManageShowPage() {
  // State for tab selection
  const [activeTab, setActiveTab] = useState("current");

  // State for form visibility
  const [showAddForm, setShowAddForm] = useState(false);

  // State for movies data
  const [movies, setMovies] = useState({
    current: [],
    upcoming: [],
  });

  // State for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for new movie form
  const [newMovie, setNewMovie] = useState({
    title: "",
    synopsis: "",
    runtime: "",
    genre: "",
    ticketPrice: "",
    director: "",
    cast: "",
    status: "currently_playing",
    image: null,
  });

  // Fetch movies data
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const [currentResponse, upcomingResponse] = await Promise.all([
        fetch("http://localhost:5500/api/movies/current"),
        fetch("http://localhost:5500/api/movies/upcoming"),
      ]);

      const currentData = await currentResponse.json();
      const upcomingData = await upcomingResponse.json();

      if (currentData.success && upcomingData.success) {
        setMovies({
          current: currentData.data,
          upcoming: upcomingData.data,
        });
      } else {
        setError("Failed to fetch movies data");
      }
    } catch (err) {
      setError("Error fetching movies: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewMovie((prev) => ({ ...prev, image: file }));
  };

  // Handle form submission
  const handleAddMovie = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to add movies");
        return;
      }

      const formData = new FormData();
      formData.append("title", newMovie.title);
      formData.append("synopsis", newMovie.synopsis);
      formData.append("runtime", newMovie.runtime);
      formData.append(
        "genre",
        newMovie.genre.split(",").map((g) => g.trim())
      );
      formData.append("ticketPrice", newMovie.ticketPrice);
      formData.append("director", newMovie.director);
      formData.append(
        "cast",
        newMovie.cast.split(",").map((c) => c.trim())
      );
      formData.append("status", newMovie.status);
      if (newMovie.image) {
        formData.append("image", newMovie.image);
      }

      const response = await fetch("http://localhost:5500/api/movies", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Refresh the movies list
        await fetchMovies();
        // Reset form and close it
        setNewMovie({
          title: "",
          synopsis: "",
          runtime: "",
          genre: "",
          ticketPrice: "",
          director: "",
          cast: "",
          status: "currently_playing",
          image: null,
        });
        setShowAddForm(false);
      } else {
        setError(data.message || "Failed to add movie");
      }
    } catch (err) {
      setError("Error adding movie: " + err.message);
    }
  };

  // Delete movie
  const handleDeleteMovie = async (id, status) => {
    try {
      // Get token from localStorage (or your storage method)
      const token = localStorage.getItem('token');
  
      // Call the DELETE API
      const response = await fetch(`http://localhost:5500/api/movies/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the movie');
      }
  
      // If deletion successful, update the local state
      setMovies((prev) => ({
        ...prev,
        [status]: prev[status].filter((movie) => movie.id !== id),
      }));
  
      alert('Movie deleted successfully! 🎬');
    } catch (error) {
      console.error('Error deleting movie:', error);
      alert('Failed to delete the movie. Please try again.');
    }
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
              onClick={() => setActiveTab("current")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "current"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Currently Playing
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "upcoming"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Upcoming Movies
            </button>
          </nav>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading movies...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Add Movie Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Movie
          </button>
        </div>

        {/* Add Movie Form */}
        {showAddForm && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8 p-6 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add New Movie
            </h3>

            <form onSubmit={handleAddMovie} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Movie Title
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700">
                    Runtime (minutes)
                  </label>
                  <input
                    type="number"
                    name="runtime"
                    value={newMovie.runtime}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Genre (comma separated)
                  </label>
                  <input
                    type="text"
                    name="genre"
                    value={newMovie.genre}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Action, Drama, Comedy"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ticket Price ($)
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700">
                    Director
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700">
                    Cast (comma separated)
                  </label>
                  <input
                    type="text"
                    name="cast"
                    value={newMovie.cast}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Actor 1, Actor 2, Actor 3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={newMovie.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="currently_playing">Currently Playing</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Movie Poster
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Synopsis
                  </label>
                  <textarea
                    name="synopsis"
                    rows={3}
                    value={newMovie.synopsis}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Movie
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Movies List */}
        {!loading && !error && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {activeTab === "current"
                  ? "Currently Playing Movies"
                  : "Upcoming Movies"}
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {movies[activeTab].length > 0 ? (
                movies[activeTab].map((movie) => (
                  <li key={movie._id} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                        {movie.imageUrl ? (
                          <img
                            className="h-32 w-24 object-cover rounded"
                            src={movie.imageUrl}
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
                          <h4 className="text-lg font-medium text-gray-900 truncate">
                            {movie.title}
                          </h4>
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            ${movie.ticketPrice.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {movie.runtime} min • {movie.genre.join(", ")}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Director: {movie.director}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Cast: {movie.cast.join(", ")}
                        </p>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {movie.synopsis}
                        </p>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-4">
                        <button
                          onClick={() =>
                            handleDeleteMovie(movie._id, activeTab)
                          }
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
                  No{" "}
                  {activeTab === "current" ? "currently playing" : "upcoming"}{" "}
                  movies found
                </li>
              )}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
