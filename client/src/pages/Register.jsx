import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/taja.png'; // adjust this path if needed

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const validValue = Object.values(data).every(el => el);

  const handleSubmit = async e => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error('Password and Confirm Password must match');
      return;
    }

    try {
      const response = await Axios({ ...SummaryApi.register, data });
      if (response.data.error) {
        toast.error(response.data.message);
      } else if (response.data.success) {
        toast.success(response.data.message);
        setData({ name: '', email: '', password: '', confirmPassword: '' });
        navigate('/login');
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full px-4 py-10 bg-white font-sans">
      <div className="max-w-xl mx-auto border rounded-lg shadow-md p-8 bg-white">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16" />
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold text-gray-800 text-sm">
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={data.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
              autoFocus
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-gray-800 text-sm">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold text-gray-800 text-sm">
              Password*
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded bg-gray-50 placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-semibold text-gray-800 text-sm">
              Confirm Password*
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={data.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded bg-gray-50 placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(prev => !prev)}
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>

          {/* Submit Button & Link */}
          <div className="flex justify-between items-center mt-4 flex-wrap gap-4">
            <button
              type="submit"
              disabled={!validValue}
              className={`px-6 py-2 rounded text-white font-semibold transition-all ${
                validValue ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Signup
            </button>
            <p className="text-sm text-gray-700">
              Already Have an Account?{' '}
              <Link to="/login" className="text-green-700 font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
