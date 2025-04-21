import { Link } from "react-router-dom";
export default function CurrentStatusPage() {
  // Static data - will be replaced with backend API calls later
  const totalTicketsSold = 589; // Example total
  const totalRevenue = (totalTicketsSold * 12.99).toFixed(2);
  const currentMovies = ["Dune: Part Two", "The Batman", "Oppenheimer"]; // Just titles for reference

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Theater Status Dashboard</h1>
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
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
          {/* Tickets Sold Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg 
                    className="h-6 w-6 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Tickets Sold</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{totalTicketsSold}</div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg 
                    className="h-6 w-6 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">${totalRevenue}</div>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Movies List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Currently Playing Movies</h3>
            <p className="mt-1 text-sm text-gray-500">All movies currently showing in theaters</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <ul className="space-y-3">
              {currentMovies.map((movie, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {movie}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Ticket price: $12.99 each • Last updated: {new Date().toLocaleString()}</p>
        </div>
      </main>
    </div>
  );
}