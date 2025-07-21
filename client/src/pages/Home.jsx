// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { valideURLConvert } from '../utils/valideURLConvert';
// import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

// // Carousel arrow icons
// const ChevronLeft = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const ChevronRight = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// // Carousel Component
// const OrganicCarousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const navigate = useNavigate();

//   const slides = [
//     {
//       id: 1,
//       title: "NATURAL",
//       subtitle: "Pure & Organic",
//       description: "We collaborate with smallholder farmers using traditional, natural farming methods to create homemade products without preservatives or artificial colors.",
//       image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop&crop=center"
//     },
//     {
//       id: 2,
//       title: "FRESH & HEALTHY",
//       subtitle: "Farm to Table",
//       description: "Discover our premium collection of organic dairy products, natural beverages, and artisanal foods crafted with care and tradition.",
//       image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&h=400&fit=crop&crop=center"
//     },
//     {
//       id: 3,
//       title: "SUSTAINABLE",
//       subtitle: "Eco-Friendly Choice",
//       description: "Join our mission to promote sustainable agriculture and support local farmers while enjoying the finest organic products.",
//       image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=400&fit=crop&crop=center"
//     }
//   ];

//   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
//   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   const goToSlide = (index) => setCurrentSlide(index);

//   useEffect(() => {
//     if (!isAutoPlaying) return;
//     const interval = setInterval(() => nextSlide(), 5000);
//     return () => clearInterval(interval);
//   }, [isAutoPlaying, currentSlide]);

//   return (
//     <div className="relative w-full h-96 overflow-hidden bg-gray-900 rounded-lg shadow-2xl">
//       {slides.map((slide, index) => (
//         <div
//           key={slide.id}
//           className={`absolute inset-0 transition-all duration-700 ease-in-out ${
//             index === currentSlide
//               ? 'opacity-100 translate-x-0'
//               : index < currentSlide
//               ? 'opacity-0 -translate-x-full'
//               : 'opacity-0 translate-x-full'
//           }`}
//           style={{
//             backgroundImage: `url(${slide.image})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         >
//           <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//           <div className="relative z-10 flex items-center justify-center h-full px-8">
//             <div className="text-center text-white max-w-4xl mx-auto">
//               <div className="mb-4">
//                 <span className="text-sm font-medium tracking-wider opacity-90">{slide.subtitle}</span>
//               </div>
//               <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide">{slide.title}</h1>
//               <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto opacity-95">{slide.description}</p>
//               <div className="mt-8">
//                 <button
//                   className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
//                   onClick={() => navigate("/shop")}
//                 >
//                   Shop Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full">
//         <ChevronLeft />
//       </button>

//       <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full">
//         <ChevronRight />
//       </button>

//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
//             }`}
//           />
//         ))}
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20">
//         <div
//           className="h-full bg-green-500 transition-all duration-300"
//           style={{
//             width: `${((currentSlide + 1) / slides.length) * 100}%`,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// // Home Page
// const Home = () => {
//   const loadingCategory = useSelector(state => state.product.loadingCategory);
//   const categoryData = useSelector(state => state.product.allCategory);
//   const subCategoryData = useSelector(state => state.product.allSubCategory);
//   const navigate = useNavigate();

//   const handleRedirectProductListpage = (id, cat) => {
//     const subcategory = subCategoryData.find(sub => sub.category.some(c => c._id === id));
//     if (!subcategory) return;
//     const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
//     navigate(url);
//   };

//   return (
//     <div className="bg-white">
//       {/* Full-width Carousel */}
//       <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
//         <div className="w-full px-4 py-4">
//           <OrganicCarousel />
//         </div>
//       </div>

//       {/* Category Header */}
//       <div className="container mx-auto px-4 mt-10 mb-6">
//         <h2 className="text-3xl font-bold text-left text-green-700">CATEGORIES</h2>
//       </div>

//       {/* Categories Grid */}
//       <div className="container mx-auto px-4 my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6">
//         {loadingCategory
//           ? new Array(12).fill(null).map((_, index) => (
//               <div key={index} className="bg-white rounded-xl p-6 h-48 shadow animate-pulse" />
//             ))
//           : categoryData.map(cat => (
//               <div
//                 key={cat._id}
//                 className="cursor-pointer"
//                 onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
//               >
//                 <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col items-center justify-between text-center hover:-translate-y-1 duration-300 h-48">
//                   <div className="flex items-center justify-center h-24">
//                     <img src={cat.image} alt={cat.name} className="max-h-full object-contain" />
//                   </div>
//                   <p className="text-sm font-semibold text-gray-800 mt-2">{cat.name}</p>
//                 </div>
//               </div>
//             ))}
//       </div>

//       {/* Category-wise Product Displays */}
//       <div className="pb-8">
//         {categoryData?.map(c => (
//           <CategoryWiseProductDisplay key={c._id} id={c._id} name={c.name} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { valideURLConvert } from '../utils/valideURLConvert';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import { FaChevronUp } from 'react-icons/fa';

// Carousel arrow icons
const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Scroll to Top Button
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } bg-gray-800 bg-opacity-60 text-white p-3 rounded-full shadow-md hover:bg-opacity-80`}
      aria-label="Scroll to top"
    >
      <FaChevronUp size={20} />
    </button>
  );
};

// Carousel Component
const OrganicCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "NATURAL",
      subtitle: "Pure & Organic",
      description: "We collaborate with smallholder farmers using traditional, natural farming methods to create homemade products without preservatives or artificial colors.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "FRESH & HEALTHY",
      subtitle: "Farm to Table",
      description: "Discover our premium collection of organic dairy products, natural beverages, and artisanal foods crafted with care and tradition.",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&h=400&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "SUSTAINABLE",
      subtitle: "Eco-Friendly Choice",
      description: "Join our mission to promote sustainable agriculture and support local farmers while enjoying the finest organic products.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=400&fit=crop&crop=center"
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  return (
    <div className="relative w-full h-96 overflow-hidden bg-gray-900 rounded-lg shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 translate-x-0'
              : index < currentSlide
              ? 'opacity-0 -translate-x-full'
              : 'opacity-0 translate-x-full'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 flex items-center justify-center h-full px-8">
            <div className="text-center text-white max-w-4xl mx-auto">
              <div className="mb-4">
                <span className="text-sm font-medium tracking-wider opacity-90">{slide.subtitle}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide">{slide.title}</h1>
              <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto opacity-95">{slide.description}</p>
              <div className="mt-8">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => navigate("/shop")}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full">
        <ChevronLeft />
      </button>

      <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full">
        <ChevronRight />
      </button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

// Home Page
const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory);
  const categoryData = useSelector(state => state.product.allCategory);
  const subCategoryData = useSelector(state => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find(sub => sub.category.some(c => c._id === id));
    if (!subcategory) return;
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
    navigate(url);
  };

  return (
    <div className="bg-white">
      {/* Full-width Carousel */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="w-full px-4 py-4">
          <OrganicCarousel />
        </div>
      </div>

      {/* Category Header */}
      <div className="container mx-auto px-4 mt-10 mb-6">
        <h2 className="text-3xl font-bold text-left text-green-700">CATEGORIES</h2>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6">
        {loadingCategory
          ? new Array(12).fill(null).map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-6 h-48 shadow animate-pulse" />
            ))
          : categoryData.map(cat => (
              <div
                key={cat._id}
                className="cursor-pointer"
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col items-center justify-between text-center hover:-translate-y-1 duration-300 h-48">
                  <div className="flex items-center justify-center h-24">
                    <img src={cat.image} alt={cat.name} className="max-h-full object-contain" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mt-2">{cat.name}</p>
                </div>
              </div>
            ))}
      </div>

      {/* Category-wise Product Displays */}
      <div className="pb-8">
        {categoryData?.map(c => (
          <CategoryWiseProductDisplay key={c._id} id={c._id} name={c.name} />
        ))}
      </div>

      {/* Scroll-to-top button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
