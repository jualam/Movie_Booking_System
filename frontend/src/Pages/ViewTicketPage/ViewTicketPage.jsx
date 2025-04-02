import React from "react";
import { Link, useParams } from "react-router-dom";
import barcodeImage from "../../assets/barcode.jpg"; // using barcde image for now

const ViewTicketPage = () => {
  const { id } = useParams();
  
  // Static ticket data 
  const ticketData = {
    movie: "The Shawshank Redemption",
    theater: "Amarillo",
    date: "April 2, 2025",
    time: "1.30 PM",
    seats: 6,
    cost: 77.94,
    orderId: id || "123456",
    screen: "Screen 5",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Movie Booking System</h1>
          <Link 
            to="/orderHistory" 
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            ← Back to Orders
          </Link>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Ticket Header */}
            <div className="bg-purple-600 p-4 text-center text-white">
              <h2 className="text-xl font-bold">{ticketData.movie}</h2>
              <p className="text-sm opacity-90">{ticketData.theater}</p>
            </div>
            {/* Ticket Details */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-500 text-xs uppercase font-medium">Date</p>
                  <p className="font-semibold">{ticketData.date}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase font-medium">Time</p>
                  <p className="font-semibold">{ticketData.time}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase font-medium">Screen</p>
                  <p className="font-semibold">{ticketData.screen}</p>
                </div>
              </div>
              {/* currently using static barcode */}
              <div className="mb-6">
                <img 
                  src={barcodeImage} 
                  alt="Ticket barcode" 
                  className="w-full h-20 object-contain border border-gray-200 rounded"
                />
                <p className="text-center text-xs text-gray-500 mt-2">
                  Order #{ticketData.orderId}
                </p>
              </div>
            {/* prince */}
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <div>
                  <p className="text-gray-500 text-xs uppercase font-medium">Total</p>
                  <p className="text-xl font-bold text-purple-600">
                    ${ticketData.cost.toFixed(2)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => window.print()}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Print Ticket
                  </button>
                  <Link
                    to="/orderHistory"
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Done
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* extra info */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Present this ticket at the theater entrance</p>
            <p className="mt-1">Valid for {ticketData.seats} person(s)</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewTicketPage;