import { Link } from "react-router-dom";

export default function AdminHomePage() {
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
          <Link
            to="/" 
            onClick={handleLogout}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Logout
          </Link>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            <Link
              to="/current-status"
              className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md hover:bg-indigo-50 transition-colors"
            >
              <div className="rounded-full bg-indigo-100 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">Current Status</h2>
              <p className="mt-2 text-gray-600 text-center">
                View ticket sales, revenue, and current movie statistics
              </p>
            </Link>

            <Link
              to="/manage-shows"
              className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md hover:bg-indigo-50 transition-colors"
            >
              <div className="rounded-full bg-indigo-100 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">Manage Shows</h2>
              <p className="mt-2 text-gray-600 text-center">
                Add, edit, or remove movie shows and set ticket prices
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}