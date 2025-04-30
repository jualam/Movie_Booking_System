import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:5500/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          setUserData(res.data.data);
          setFormData({
            firstName: res.data.data.firstName,
            lastName: res.data.data.lastName,
            address: res.data.data.address,
            phoneNumber: res.data.data.phoneNumber,
          });
        }
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    axios
      .patch('http://localhost:5500/api/users/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          setUserData(res.data.user);
          setEditMode(false);
        }
      })
      .catch((err) => {
        console.error('Error updating profile:', err);
      });
  };

  if (loading || !userData) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
        <p className="text-gray-600 text-sm mt-2">View and manage your account information</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">First Name</p>
            {editMode ? (
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            ) : (
              <p className="text-gray-800 text-lg">{userData.firstName}</p>
            )}
          </div>

          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Last Name</p>
            {editMode ? (
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            ) : (
              <p className="text-gray-800 text-lg">{userData.lastName}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <p className="text-gray-500 text-sm font-medium mb-1">Email</p>
            <p className="text-gray-800 text-lg">{userData.email}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-gray-500 text-sm font-medium mb-1">Address</p>
            {editMode ? (
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            ) : (
              <p className="text-gray-800 text-lg">{userData.address}</p>
            )}
          </div>

          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Phone Number</p>
            {editMode ? (
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            ) : (
              <p className="text-gray-800 text-lg">{userData.phoneNumber}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <p className="text-gray-500 text-sm font-medium mb-1">Password</p>
            <p className="text-gray-800 text-lg">*********</p>
          </div>
        </div>

        {editMode ? (
          <div className="flex gap-4">
            <button
              className="w-full py-3 px-6 text-sm font-medium rounded text-white bg-green-600 hover:bg-green-700"
              onClick={handleSave}
            >
              Save Changes
            </button>
            <button
              className="w-full py-3 px-6 text-sm font-medium rounded text-gray-800 border border-gray-400 hover:bg-gray-100"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="w-full py-3 px-6 text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => setEditMode(true)}
          >
            Edit Info
          </button>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Return to <Link to="/homePage" className="text-blue-600 hover:text-blue-700">Home</Link>
      </p>
    </div>
  );
};

export default ProfilePage;
