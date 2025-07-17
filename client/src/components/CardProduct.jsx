

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { valideURLConvert } from '../utils/valideURLConvert';
// import { pricewithDiscount } from '../utils/PriceWithDiscount';
// import AddToCartButton from './AddToCartButton';

// const CardProduct = ({ data }) => {
//   const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
//   const [loading, setLoading] = useState(false);

//   return (
//     <Link
//       to={url}
//       className="group relative border border-gray-200 p-4 grid gap-2 rounded-xl cursor-pointer bg-white hover:shadow-md transition-transform duration-300 hover:-translate-y-1"
//     >
//       {/* Image */}
//       <div className="w-full h-40 rounded-xl overflow-hidden bg-white flex items-center justify-center">
//         <img
//           src={data.image[0]}
//           alt={data.name}
//           className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//       </div>

//       {/* Badges */}
//       <div className="flex items-center gap-2 z-10">
//         <div className="flex items-center gap-1 rounded-full text-xs w-fit py-1 px-3 text-green-700 bg-green-50 border border-green-200 shadow-sm">
//           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
//           <span className="font-medium">10 min</span>
//         </div>
//         {Boolean(data.discount) && (
//           <div className="relative">
//             <p className="text-green-700 bg-green-100 px-3 py-1 text-xs rounded-full font-semibold border border-green-300 shadow-sm">
//               {data.discount}% OFF
//             </p>
//             <div className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400">
//               <svg className="w-full h-full animate-spin" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" />
//               </svg>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Product Name */}
//       <h2 className="text-gray-800 text-sm font-semibold line-clamp-2 group-hover:text-black transition-colors">
//         {data.name}
//       </h2>

//       {/* Unit + Price Row */}
//       <div className="flex items-center justify-between text-sm">
//         <span className="text-gray-600 font-medium">{data.unit}</span>
//         <span className="text-red-600 font-bold text-base">
//           Rs {pricewithDiscount(data.price, data.discount).toFixed(2)}
//         </span>
//       </div>

//       {/* Buttons */}
//       <div className="flex items-center justify-between mt-2 gap-2">
//         {data.stock === 0 ? (
//           <p className="text-red-500 text-sm text-center font-semibold bg-red-50 px-3 py-1 rounded-full border border-red-200 w-full">
//             Out of stock
//           </p>
//         ) : (
//           <>
//             <AddToCartButton data={data} />
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 localStorage.setItem('buyNowProduct', JSON.stringify(data));
//                 window.location.href = '/checkout?mode=buy';
//               }}
//               className="px-4 py-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-md text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-md"
//             >
//               Buy
//             </button>
//           </>
//         )}
//       </div>
//     </Link>
//   );
// };

// export default CardProduct;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ useNavigate added
import { valideURLConvert } from '../utils/valideURLConvert';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import AddToCartButton from './AddToCartButton';

const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ initialize navigate

  return (
    <Link
      to={url}
      className="group relative border border-gray-200 p-4 grid gap-2 rounded-xl cursor-pointer bg-white hover:shadow-md transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="w-full h-40 rounded-xl overflow-hidden bg-white flex items-center justify-center">
        <img
          src={data.image[0]}
          alt={data.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 z-10">
        <div className="flex items-center gap-1 rounded-full text-xs w-fit py-1 px-3 text-green-700 bg-green-50 border border-green-200 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-medium">10 min</span>
        </div>
        {Boolean(data.discount) && (
          <div className="relative">
            <p className="text-green-700 bg-green-100 px-3 py-1 text-xs rounded-full font-semibold border border-green-300 shadow-sm">
              {data.discount}% OFF
            </p>
            <div className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400">
              <svg className="w-full h-full animate-spin" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Product Name */}
      <h2 className="text-gray-800 text-sm font-semibold line-clamp-2 group-hover:text-black transition-colors">
        {data.name}
      </h2>

      {/* Unit + Price Row */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 font-medium">{data.unit}</span>
        <span className="text-red-600 font-bold text-base">
          Rs {pricewithDiscount(data.price, data.discount).toFixed(2)}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-2 gap-2">
        {data.stock === 0 ? (
          <p className="text-red-500 text-sm text-center font-semibold bg-red-50 px-3 py-1 rounded-full border border-red-200 w-full">
            Out of stock
          </p>
        ) : (
          <>
            <AddToCartButton data={data} />
            <button
              onClick={(e) => {
                e.preventDefault(); // ✅ prevent Link default behavior
                localStorage.setItem('buyNowProduct', JSON.stringify(data));
                navigate('/checkout?mode=buy'); // ✅ client-side navigation
              }}
              className="px-4 py-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-md text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-md"
            >
              Buy
            </button>
          </>
        )}
      </div>
    </Link>
  );
};

export default CardProduct;
