import React from 'react';
import { FaBoxOpen, FaHeadset, FaTruck, FaLock } from 'react-icons/fa';
import aboutImage from '../assets/about.png'; // ✅ update if needed

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-900 pt-6 pb-12 px-4 md:px-10 lg:px-20 font-sans">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-green-800 tracking-tight">
        About The TAJA
      </h1>

      <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
        {/* Text Section */}
        <div className="space-y-6 text-[17px] leading-relaxed font-medium text-[#1f2937]">
          <p>
            At <strong>TAJA</strong>, we believe that healthy living starts with what you eat.
            That’s why we’re committed to delivering the freshest, 100% certified organic products
            straight from farms to your doorstep.
          </p>
          <p>
            Our mission is to make clean, chemical-free food accessible, affordable, and sustainable for every household.
          </p>
          <p>
            We partner with trusted organic farmers who follow ethical, eco-friendly growing methods.
            From seasonal fruits and vegetables to pantry staples and snacks, each item is handpicked to meet strict quality standards.
          </p>
          <p>
            Whether you're new to organic living or a long-time advocate, TAJA is your trusted source
            for clean, nutritious groceries — delivered with care, transparency, and reliability.
          </p>

          {/* Stats */}
          <div className="flex gap-10 mt-8 text-center">
            <div>
              <p className="text-3xl font-bold text-green-700">0.1k</p>
              <p className="text-gray-600 text-sm">Vendors</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-700">23k</p>
              <p className="text-gray-600 text-sm">Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-700">2k</p>
              <p className="text-gray-600 text-sm">Products</p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div>
          <img
            src={aboutImage}
            alt="Fresh organic produce"
            className="rounded-lg w-full h-auto object-cover shadow-lg"
          />
        </div>
      </div>

      {/* Features */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose TAJA?</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
          {[
            { icon: '📦', title: 'Product Packing', desc: 'Eco-friendly packaging to keep your products fresh.' },
            { icon: '🕐', title: '24X7 Support', desc: 'Our team is always ready to help.' },
            { icon: '🚚', title: 'Delivery in 5 Days', desc: 'We deliver your order within 3–5 days.' },
            { icon: '🔐', title: 'Payment Secure', desc: 'Encrypted and safe payment process.' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded shadow hover:shadow-md transition">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
              <p className="text-gray-700 text-sm font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
