import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Processing payment with:', paymentMethod, cardDetails);
    navigate("/viewTicket/:id");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6">
      <div className="text-center mb-12 sm:mb-1">
        <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
        <p className="text-gray-600 text-sm mt-2">Complete your ticket purchase</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Payment Method</h3>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('credit')}
              className={`py-3 px-4 rounded-lg border ${paymentMethod === 'credit' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
            >
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
                <span className="text-sm">Credit Card</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('venmo')}
              className={`py-3 px-4 rounded-lg border ${paymentMethod === 'venmo' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
            >
              <div className="flex flex-col items-center">
                <img src="\src\assets\venmo-icon.svg" alt="Venmo" className=" h-8 mb-2" />
                <span className="text-sm">Venmo</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('paypal')}
              className={`py-3 px-4 rounded-lg border ${paymentMethod === 'paypal' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
            >
              <div className="flex flex-col items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="w-16 h-8 mb-2" />
                <span className="text-sm">PayPal</span>
              </div>
            </button>
          </div>
        </div>

        {paymentMethod === 'credit' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm font-medium mb-2 block">Card Number</label>
              <input
                type="text"
                placeholder="1234 1234 1234 1234"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent focus:outline-blue-500 transition-all"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-gray-800 text-sm font-medium mb-2 block">Cardholder Name</label>
              <input
                type="text"
                placeholder="Juhair Alam"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent focus:outline-blue-500 transition-all"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-gray-800 text-sm font-medium mb-2 block">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent focus:outline-blue-500 transition-all"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm font-medium mb-2 block">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent focus:outline-blue-500 transition-all"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 px-6 text-sm font-medium tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Complete Payment
              </button>
            </div>
          </form>
        )}

        {paymentMethod !== 'credit' && (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-6">
              You'll be redirected to {paymentMethod === 'paypal' ? 'PayPal' : 'Venmo'} to complete your payment
            </p>
            <button
              onClick={handleSubmit}
              className="w-full py-3 px-6 text-sm font-medium tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Continue to {paymentMethod === 'paypal' ? 'PayPal' : 'Venmo'}
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          <Link to="/ticketBooking/${movieId}" className="text-blue-600 hover:text-blue-700">
            ← Back to booking details
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;