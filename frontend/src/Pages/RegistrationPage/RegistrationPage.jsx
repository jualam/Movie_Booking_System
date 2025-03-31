import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      alert("You must accept the terms and conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registration Successful", formData);

    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
        <p className="text-gray-600 text-sm mt-2">Create your account</p>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <label className="text-gray-800 text-sm font-medium mb-2 block">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent focus:outline-blue-500 transition-all"
              placeholder="Enter first name"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm font-medium mb-2 block">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent focus:outline-blue-500 transition-all"
              placeholder="Enter last name"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-gray-800 text-sm font-medium mb-2 block">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent focus:outline-blue-500 transition-all"
              placeholder="Enter your address"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm font-medium mb-2 block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent focus:outline-blue-500 transition-all"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm font-medium mb-2 block">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent focus:outline-blue-500 transition-all"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm font-medium mb-2 block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent focus:outline-blue-500 transition-all"
              placeholder="Enter password"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm font-medium mb-2 block">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent focus:outline-blue-500 transition-all"
              placeholder="Confirm password"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="w-4 h-4 mr-2"
          />
          <label className="text-sm text-gray-600">
            I accept the{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              terms and conditions
            </a>
          </label>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 px-6 text-sm font-medium tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Sign Up
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:text-blue-700">
            Log in
        </Link>
      </p>
    </div>
  );
};

export default RegistrationPage;
