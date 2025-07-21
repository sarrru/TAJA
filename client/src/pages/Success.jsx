import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/cartProduct';

const Success = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const successText = location?.state?.text || 'Order';

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-green-50 px-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center border border-green-100">
        <div className="flex justify-center mb-4">
          <img
            src="https://img.icons8.com/emoji/96/check-mark-emoji.png"
            alt="Success"
            className="h-16 w-16"
          />
        </div>
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          {successText} Successful!
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Thank you for your order! A confirmation email will be sent to you shortly.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-green-700 transition-all"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Success;
