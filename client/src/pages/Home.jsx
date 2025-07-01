// import React from 'react';
// import banner from '../assets/b.png';
// import { useSelector } from 'react-redux';
// import { valideURLConvert } from '../utils/valideURLConvert';
// import { useNavigate } from 'react-router-dom';
// import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

// const Home = () => {
//   const loadingCategory = useSelector(state => state.product.loadingCategory);
//   const categoryData = useSelector(state => state.product.allCategory);
//   const subCategoryData = useSelector(state => state.product.allSubCategory);
//   const navigate = useNavigate();

//   const handleRedirectProductListpage = (id, cat) => {
//     const subcategory = subCategoryData.find(sub => {
//       return sub.category.some(c => c._id === id);
//     });

//     if (!subcategory) return;

//     const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
//     navigate(url);
//   };

//   return (
//     <div className='bg-white'>
//       {/* ✅ Full Width Banner */}
//       <div className='w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'>
//         <div className={`w-full ${!banner && 'animate-pulse'}`}>
//           <img
//             src={banner}
//             className='w-full h-auto object-cover block'
//             alt='Organic Products Banner - The natural choice for healthy living'
//             style={{ display: 'block', width: '100%', height: 'auto' }}
//           />
//         </div>
//       </div>

//       {/* ✅ Categories Section Heading (Left Aligned) */}
//       <div className='container mx-auto px-4 mt-10 mb-6'>
//         <h2 className='text-3xl font-bold text-left text-green-700'>
//           CATEGORIES
//         </h2>
//       </div>

//       {/* 🟢 Category Thumbnails */}
//       <div className='container mx-auto px-4 my-8 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2'>
//         {loadingCategory ? (
//           new Array(12).fill(null).map((_, index) => (
//             <div
//               key={index + 'loadingcategory'}
//               className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'
//             >
//               <div className='bg-blue-100 min-h-24 rounded'></div>
//               <div className='bg-blue-100 h-8 rounded'></div>
//             </div>
//           ))
//         ) : (
//           categoryData.map((cat) => (
//             <div
//               key={cat._id + 'displayCategory'}
//               className='w-full h-full cursor-pointer hover:scale-105 transition-transform duration-200'
//               onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
//             >
//               <div className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex justify-center items-center'>
//                 <img
//                   src={cat.image}
//                   alt={cat.name}
//                   className='w-20 h-20 object-contain mx-auto'
//                 />
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* 🟢 Category-Wise Product Display */}
//       {categoryData?.map((c) => (
//         <CategoryWiseProductDisplay
//           key={c?._id + 'CategorywiseProduct'}
//           id={c?._id}
//           name={c?.name}
//         />
//       ))}
//     </div>
//   );
// };

// export default Home;

import React from 'react';
import banner from '../assets/b.png';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory);
  const categoryData = useSelector(state => state.product.allCategory);
  const subCategoryData = useSelector(state => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find(sub => {
      return sub.category.some(c => c._id === id);
    });

    if (!subcategory) return;

    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
    navigate(url);
  };

  return (
    <div className='bg-white'>
      {/* ✅ Full Width Banner */}
      <div className='w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'>
        <div className={`w-full ${!banner && 'animate-pulse'}`}>
          <img
            src={banner}
            className='w-full h-auto object-cover block'
            alt='Organic Products Banner - The natural choice for healthy living'
          />
        </div>
      </div>

      {/* ✅ Categories Section Heading */}
      <div className='container mx-auto px-4 mt-10 mb-4'>
        <h2 className='text-3xl font-bold text-left text-green-700'>
          CATEGORIES
        </h2>
      </div>

      {/* 🟢 Category Thumbnails (Bigger Icons) */}
      <div className='container mx-auto px-4 mt-4 mb-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4'>
        {loadingCategory ? (
          new Array(12).fill(null).map((_, index) => (
            <div
              key={index + 'loadingcategory'}
              className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'
            >
              <div className='bg-blue-100 min-h-24 rounded'></div>
              <div className='bg-blue-100 h-8 rounded'></div>
            </div>
          ))
        ) : (
          categoryData.map((cat) => (
            <div
              key={cat._id + 'displayCategory'}
              className='w-full h-full cursor-pointer hover:scale-105 transition-transform duration-200'
              onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
            >
              <div className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col justify-center items-center h-40'>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className='w-24 h-24 object-contain'
                />
                <span className='mt-2 text-sm font-medium text-center text-gray-700'>
                  {cat.name}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🟢 Category-Wise Product Display */}
      <div className='pb-4'>
        {categoryData?.map((c) => (
          <CategoryWiseProductDisplay
            key={c?._id + 'CategorywiseProduct'}
            id={c?._id}
            name={c?.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
