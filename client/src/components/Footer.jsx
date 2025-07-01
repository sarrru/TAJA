
// import React from 'react';
// import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-100 border-t text-gray-700">
//       {/* Top Section */}
//       <div className="container mx-auto px-4 pt-10 pb-4 grid grid-cols-1 md:grid-cols-4 gap-6">
//         {/* Brand Info */}
//         <div className="space-y-3">
//           <img src="/taja.png"  className="w-16 h-16 object-contain" />
//           <p className="text-sm">
//             Taja delivers fresh, organic products to your door.
//             Eat healthy, live naturally.
//           </p>
//           <div className="text-sm space-y-1">
//             <p>📍 Dhapakhel, Lalitpur</p>
//             <p>📧 taja@gmail.com</p>
//             <p>📞 +9779823097220</p>
//           </div>
//         </div>

//         {/* Category */}
//         <div>
//           <h3 className="font-semibold mb-3">Category</h3>
//           <ul className="space-y-1 text-sm">
//             <li><a href="#" className="hover:text-green-600">Fresh Farm</a></li>
//             <li><a href="#" className="hover:text-green-600">Fresh Fruits</a></li>
//             <li><a href="#" className="hover:text-green-600">Dairy Products</a></li>
//             <li><a href="#" className="hover:text-green-600">Vegetables</a></li>
//           </ul>
//         </div>

//         {/* Company */}
//         <div>
//           <h3 className="font-semibold mb-3">Company</h3>
//           <ul className="space-y-1 text-sm">
//             <li><a href="#" className="hover:text-green-600">Contact Us</a></li>
//             <li><a href="#" className="hover:text-green-600">About Us</a></li>
//           </ul>
//         </div>

//         {/* Help */}
//         <div>
//           <h3 className="font-semibold mb-3">Help</h3>
//           <ul className="space-y-1 text-sm">
//             <li><a href="#" className="hover:text-green-600">FAQs</a></li>
//             <li><a href="#" className="hover:text-green-600">Delivery Info</a></li>
//           </ul>
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div className="border-t py-3 px-4 md:px-10 bg-white flex flex-col md:flex-row justify-between items-center">
//         <p className="text-sm text-gray-500">
//           ©2025 <span className="font-semibold">TAJA</span>, All rights reserved.
//         </p>
//         <div className="flex gap-4 text-gray-600 text-xl mt-2 md:mt-0">
//           <a href="#" className="hover:text-green-600"><FaFacebook /></a>
//           <a href="#" className="hover:text-green-600"><FaInstagram /></a>
//           <a href="#" className="hover:text-green-600"><FaLinkedin /></a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import React from 'react';
// import { FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
// import logo from '../assets/taja.png';
// import footerImg1 from '../assets/footer.jpg';
// import footerImg2 from '../assets/footer1.jpg';
// import footerImg3 from '../assets/footer2.jpg';
// import footerImg4 from '../assets/footer3.jpg';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-100 text-neutral-800 pt-10 font-medium">
//       {/* Top Footer Section */}
//       <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        
//         {/* Brand Info */}
//         <div>
//           <img src={logo} alt="TAJA logo" className="w-16 mb-2" />
//           <p className="text-sm mb-4 leading-relaxed">
//             Taja delivers fresh, organic products to your door. Eat healthy, live naturally.
//           </p>
//           <div className="flex items-start gap-2 text-sm mb-1">
//             <FaMapMarkerAlt /> <span>Dhapakhel, Lalitpur</span>
//           </div>
//           <div className="flex items-start gap-2 text-sm mb-1">
//             <FaEnvelope /> <span>taja@gmail.com</span>
//           </div>
//           <div className="flex items-start gap-2 text-sm">
//             <FaPhone /> <span>+9779823097220</span>
//           </div>
//         </div>

//         {/* Categories */}
//         <div>
//           <h4 className="font-semibold mb-3 text-gray-900">Category</h4>
//           <ul className="space-y-2 text-sm">
//             <li>Fresh Farm</li>
//             <li>Fresh Fruits</li>
//             <li>Dairy Products</li>
//             <li>Homemade</li>
//           </ul>
//         </div>

//         {/* Company */}
//         <div>
//           <h4 className="font-semibold mb-3 text-gray-900">Company</h4>
//           <ul className="space-y-2 text-sm">
//             <li>Contact Us</li>
//             <li>About Us</li>
//           </ul>
//         </div>

//         {/* Help / Gallery */}
//         <div>
//           <h4 className="font-semibold mb-3 text-gray-900">Help</h4>
//           <ul className="space-y-2 text-sm">
//             <li>FAQs</li>
//             <li>Delivery Info</li>
//           </ul>
//           <div className="flex flex-wrap gap-2 mt-4">
//             {[footerImg1, footerImg2, footerImg3, footerImg4].map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt={`footer-img-${idx}`}
//                 className="w-12 h-12 object-cover rounded"
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Footer Bottom Bar */}
//       <div className="border-t mt-8 pt-4 pb-6 flex flex-col md:flex-row items-center justify-between container mx-auto px-4 text-sm text-neutral-600">
//         <p>©2025 <span className="font-semibold text-neutral-800">TAJA</span>, All rights reserved.</p>
//         <div className="flex gap-4 mt-2 md:mt-0 text-xl text-neutral-800">
//           <a href="#"><FaFacebook /></a>
//           <a href="#"><FaInstagram /></a>
//           <a href="#"><FaLinkedin /></a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
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
            <li>Contact Us</li>
            <li>About Us</li>
          </ul>
        </div>

        {/* Help / Gallery */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Help</h4>
          <ul className="space-y-2 text-sm">
            <li>FAQs</li>
            <li>Delivery Info</li>
          </ul>
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

      {/* Footer Bottom Bar */}
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

