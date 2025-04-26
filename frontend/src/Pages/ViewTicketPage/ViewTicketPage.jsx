import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewTicketPage = () => {
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5500/api/bookings/tickets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setTicketData(data.ticket);
        } else {
          console.error("Error fetching ticket details");
        }
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };
    fetchTicket();
  }, [id]);

  if (!ticketData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-900 text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Movie Booking System</h1>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="bg-purple-600 p-4 text-center text-white">
              <h2 className="text-xl font-bold">{ticketData.movie}</h2>
              <p className="text-sm opacity-90">{ticketData.theatre}</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-500 text-xs uppercase font-medium">
                    Date
                  </p>
                  <p className="font-semibold">
                    {new Date(ticketData.bookingDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase font-medium">
                    Time
                  </p>
                  <p className="font-semibold">{ticketData.showtime}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase font-medium">
                    Total Tickets
                  </p>
                  <p className="font-semibold">{ticketData.totalTickets}</p>
                </div>
              </div>
              <div className="mb-6">
                <img
                  src={ticketData.qrCode}
                  alt="Ticket QR Code"
                  className="w-full h-20 object-contain border border-gray-200 rounded"
                />
                <p className="text-center text-xs text-gray-500 mt-2">
                  Order #{ticketData.ticketNumber}
                </p>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <div>
                  <p className="text-gray-500 text-xs uppercase font-medium">
                    Total
                  </p>
                  <p className="text-xl font-bold text-purple-600">
                    ${(ticketData.totalTickets * 12.99).toFixed(2)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.print()}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Print Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Present this ticket at the theater entrance</p>
            <p className="mt-1">
              Valid for {ticketData.totalTickets} person(s)
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewTicketPage;
