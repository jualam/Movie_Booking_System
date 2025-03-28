import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner Section */}
      <div className="bg-blue-500 text-white text-center p-10">
        <h1 className="text-3xl font-bold">Banner with Car Picture and Name</h1>
      </div>

      <div className="container mx-auto p-4 grid grid-cols-4 gap-4">
        {/* Sidebar (Brand Names & Types) */}
        <div className="col-span-1 bg-green-400 p-4 text-white">
          <h2 className="text-xl font-semibold">Brand Names</h2>
          <p>Types</p>
        </div>

        {/* Main Content */}
        <div className="col-span-3 space-y-4">
          {/* Featured Vehicles */}
          <div className="bg-red-400 p-10 text-white text-center">
            <h2 className="text-2xl font-bold">Featured Vehicles</h2>
            <p>Mainly in stock, carousel type</p>
          </div>

          {/* Contact & Map Section */}
          <div className="bg-yellow-400 p-10 text-white text-center">
            <h2 className="text-2xl font-bold">Contact & Map</h2>
          </div>
        </div>
      </div>

      {/* Get Started Button */}
      <div className="text-center mt-10">
        <Link to="/login">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full text-lg">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
