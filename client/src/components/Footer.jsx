import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/taja.png';
import footerImg1 from '../assets/footer.jpg';
import footerImg2 from '../assets/footer1.jpg';
import footerImg3 from '../assets/footer2.jpg';
import footerImg4 from '../assets/footer3.jpg';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-neutral-800 pt-12 pb-10 px-6 md:px-10 font-medium">
      {/* Top Footer Section */}
      <div className="container mx-auto grid md:grid-cols-4 gap-8">

        {/* Brand Info */}
        <div>
          <img src={logo} alt="TAJA logo" className="w-20 mb-3" />
          <p className="text-sm mb-4 leading-relaxed">
            Taja delivers fresh, organic products to your door. Eat healthy, live naturally.
          </p>
          <div className="flex items-start gap-2 text-sm mb-1">
            <FaMapMarkerAlt /> <span>Dhapakhel, Lalitpur</span>
          </div>
          <div className="flex items-start gap-2 text-sm mb-1">
            <FaEnvelope /> <span>taja@gmail.com</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <FaPhone /> <span>+9779823097220</span>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Category</h4>
          <ul className="space-y-2 text-sm">
            <li>Fresh Farm</li>
            <li>Fresh Fruits</li>
            <li>Dairy Products</li>
            <li>Vegetables</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/contact-us" className="hover:text-green-800">Contact Us</Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-green-800">About Us</Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Help</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/faq" className="hover:text-green-800">FAQs</Link>
            </li>
            <li>
              <Link to="/delivery-info" className="hover:text-green-800">Delivery Info</Link>
            </li>
          </ul>

          {/* Footer Gallery */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[footerImg1, footerImg2, footerImg3, footerImg4].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`footer-img-${idx}`}
                className="w-12 h-12 object-cover rounded"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t mt-10 pt-4 flex flex-col md:flex-row items-center justify-between container mx-auto text-sm text-neutral-600">
        <p>©2025 <span className="font-semibold text-neutral-800">TAJA</span>, All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0 text-xl text-neutral-800">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
