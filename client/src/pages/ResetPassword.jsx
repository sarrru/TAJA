import React, { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import logo from '../assets/taja.png'; // optional: use if you want logo on top

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validValue = Object.values(data).every(el => el);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate('/');
    }

    if (location?.state?.email) {
      setData(prev => ({
        ...prev,
        email: location.state.email
      }));
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      toast.error('New password and confirm password must be same.');
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login');
        setData({ email: '', newPassword: '', confirmPassword: '' });
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

        <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">Enter Your Password</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block mb-1 font-semibold text-gray-800 text-sm">
              New Password*
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                placeholder="Enter your new password"
                value={data.newPassword}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!validValue}
            className={`w-full py-2 rounded font-semibold text-white transition-all ${
              validValue ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Change Password
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-700 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-green-700 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
