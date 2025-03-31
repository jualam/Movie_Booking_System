import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  // Mock user data (would come from your registration in a real app)
  const userData = {
    firstName: "Juhair",
    lastName: "Alam",
    email: "juhair@example.com",
    address: "3111 6th St, Lubbock, TX",
    phone: "(555) 555-5555",
    password:"*********",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
        <p className="text-gray-600 text-sm mt-2">View and manage your account information</p>
      </div>

      {/* displaying proifle info */}
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">First Name</p>
            <p className="text-gray-800 text-lg">{userData.firstName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Last Name</p>
            <p className="text-gray-800 text-lg">{userData.lastName}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-500 text-sm font-medium mb-1">Email</p>
            <p className="text-gray-800 text-lg">{userData.email}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-500 text-sm font-medium mb-1">Address</p>
            <p className="text-gray-800 text-lg">{userData.address}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Phone Number</p>
            <p className="text-gray-800 text-lg">{userData.phone}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-500 text-sm font-medium mb-1">Password</p>
            <p className="text-gray-800 text-lg">{userData.password}</p>
          </div>
        </div>

        {/*added this edit info button since professor told that phone,pass,adress could be edited */}
        <button
          className="w-full py-3 px-6 text-sm font-medium tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          onClick={() => alert('will add edit functionality later')}
        >
          Edit Info
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Return to <Link to="/homePage" className="text-blue-600 hover:text-blue-700">Home</Link>
      </p>
    </div>
  );
};

export default ProfilePage;