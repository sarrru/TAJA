// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SummaryApi from "../common/SummaryApi";
// import CardProduct from "./CardProduct";

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [sortBy, setSortBy] = useState("featured");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(12);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [maxPrice, setMaxPrice] = useState(250);
//   const [searchQuery, setSearchQuery] = useState("");

//   const carouselSlides = [
//     {
//       id: 1,
//       title: "ORGANIC DAIRY",
//       subtitle: "Fresh & Pure",
//       description:
//         "Premium organic milk, cheese, and yogurt from grass-fed cows. Rich in nutrients and free from artificial hormones.",
//       bgImage:
//         "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=1200&h=600&fit=crop&crop=center",
//       category: "Dairy Products",
//     },
//     {
//       id: 2,
//       title: "GLUTEN FREE",
//       subtitle: "Wholesome & Healthy",
//       description:
//         "Certified gluten-free grains, flours, and baked goods. Perfect for celiac-friendly and health-conscious lifestyles.",
//       bgImage:
//         "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=600&fit=crop&crop=center",
//       category: "Gluten Free",
//     },
//     {
//       id: 3,
//       title: "FRESH HERBS",
//       subtitle: "Garden to Table",
//       description:
//         "Aromatic organic herbs and spices grown without pesticides. Add natural flavor and health benefits to your meals.",
//       bgImage:
//         "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&h=600&fit=crop&crop=center",
//       category: "Herbs & Spices",
//     },
//     {
//       id: 4,
//       title: "ORGANIC PRODUCE",
//       subtitle: "Farm Fresh Daily",
//       description:
//         "Seasonal organic fruits and vegetables harvested at peak ripeness. Bursting with flavor and vital nutrients.",
//       bgImage:
//         "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop&crop=center",
//       category: "Fresh Produce",
//     },
//     {
//       id: 5,
//       title: "NATURAL GRAINS",
//       subtitle: "Ancient & Modern",
//       description:
//         "Whole grain cereals, quinoa, and ancient grains. Packed with fiber, protein, and essential minerals.",
//       bgImage:
//         "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=600&fit=crop&crop=center",
//       category: "Grains & Cereals",
//     },
//     {
//       id: 6,
//       title: "SUPERFOODS",
//       subtitle: "Nutrient Powerhouse",
//       description:
//         "Organic superfoods like chia seeds, goji berries, and spirulina. Boost your health naturally.",
//       bgImage:
//         "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&h=600&fit=crop&crop=center",
//       category: "Superfoods",
//     },
//   ];

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(SummaryApi.getProduct.url, {
//         categories: selectedCategories,
//         price: maxPrice,
//         sortBy,
//         page: currentPage,
//         limit: itemsPerPage,
//         search: searchQuery.trim(),
//       });

//       const { data, totalCount } = response.data || {};
//       setProducts(data || []);
//       setTotalPages(Math.ceil((totalCount || 0) / itemsPerPage));
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       fetchProducts();
//     }, 400);
//     return () => clearTimeout(delay);
//   }, [selectedCategories, maxPrice, sortBy, currentPage, searchQuery]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
//     }, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   const goToPrevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
//   };

//   const goToNextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="bg-white">
//       {/* Carousel Banner */}
//       <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
//         <div className="w-full px-4 py-4">
//           <div className="relative w-full h-96 overflow-hidden bg-gray-900 rounded-lg shadow-2xl">
//             {carouselSlides.map((slide, index) => (
//               <div
//                 key={slide.id}
//                 className={`absolute inset-0 transition-all duration-700 ease-in-out ${
//                   index === currentSlide
//                     ? "opacity-100 translate-x-0"
//                     : index < currentSlide
//                     ? "opacity-0 -translate-x-full"
//                     : "opacity-0 translate-x-full"
//                 }`}
//                 style={{
//                   backgroundImage: `url(${slide.bgImage})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                 }}
//               >
//                 <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//                 <div className="relative z-10 flex items-center justify-center h-full px-8">
//                   <div className="text-center text-white max-w-4xl mx-auto">
//                     <div className="mb-4">
//                       <span className="text-sm font-medium tracking-wider opacity-90">
//                         {slide.subtitle}
//                       </span>
//                     </div>
//                     <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide">
//                       {slide.title}
//                     </h1>
//                     <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto opacity-95">
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* Arrows */}
//             <button
//               onClick={goToPrevSlide}
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>

//             <button
//               onClick={goToNextSlide}
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>

//             {/* Dots */}
//             <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
//               {carouselSlides.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentSlide(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === currentSlide
//                       ? "bg-white scale-125"
//                       : "bg-white bg-opacity-50 hover:bg-opacity-75"
//                   }`}
//                 />
//               ))}
//             </div>

//             {/* Progress Bar */}
//             <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20">
//               <div
//                 className="h-full bg-green-500 transition-all duration-300"
//                 style={{
//                   width: `${((currentSlide + 1) / carouselSlides.length) * 100}%`,
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//        {/* ✅ Products & Filters */}
//       <div className="container mx-auto px-4 py-12">
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* ✅ Products Section */}
//           <div className="w-full lg:w-3/4">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
//               <h2 className="text-2xl font-semibold text-green-800">
//                 {products.length} Organic Products
//               </h2>
//               <div>
//                 <label className="mr-2">Sort by:</label>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => {
//                     setSortBy(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-4 py-2 border rounded-lg"
//                 >
//                   <option value="featured">Featured</option>
//                   <option value="priceLow">Price: Low to High</option>
//                   <option value="priceHigh">Price: High to Low</option>
//                   <option value="name">Name: A to Z</option>
//                 </select>
//               </div>
//             </div>

//             {loading ? (
//               <div className="text-center py-20">Loading...</div>
//             ) : products.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {products.map((item, index) => (
//                   <CardProduct key={index} data={item} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-20 text-gray-500">No products found.</div>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="mt-10 flex justify-center items-center space-x-2">
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//                 >
//                   «
//                 </button>
//                 {[...Array(totalPages)].map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => handlePageChange(i + 1)}
//                     className={`px-4 py-2 rounded-full ${
//                       currentPage === i + 1
//                         ? "bg-green-600 text-white"
//                         : "bg-gray-100 hover:bg-gray-200"
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//                 >
//                   »
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* ✅ Filter Sidebar on Right */}
//           <div className="w-full lg:w-1/4 border border-green-500 rounded-md p-4 h-fit sticky top-24 shadow-sm max-h-[500px] overflow-y-auto">
//             <h3 className="text-xl font-semibold text-green-700 mb-4">Filter Products</h3>

//             <div className="mb-4">
//               <h4 className="font-semibold mb-2">Category</h4>
//               <label className="block"><input type="checkbox" className="mr-2" /> Fruits</label>
//               <label className="block"><input type="checkbox" className="mr-2" /> Vegetables</label>
//               <label className="block"><input type="checkbox" className="mr-2" /> Grains</label>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-semibold mb-2">Price Range</h4>
//               <input type="range" className="w-full" min="0" max="1000" />
//               <p className="text-sm mt-1 text-gray-600">Under ₹1000</p>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-semibold mb-2">Colors</h4>
//               <div className="flex gap-2">
//                 <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
//                 <div className="w-4 h-4 bg-red-500 rounded-full"></div>
//                 <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
//               </div>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-semibold mb-2">Weight</h4>
//               <label className="block"><input type="checkbox" className="mr-2" /> 500g</label>
//               <label className="block"><input type="checkbox" className="mr-2" /> 1kg</label>
//               <label className="block"><input type="checkbox" className="mr-2" /> 5kg</label>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-2">Tags</h4>
//               <div className="flex flex-wrap gap-2 text-sm">
//                 <span className="bg-gray-200 px-2 py-1 rounded">Organic</span>
//                 <span className="bg-gray-200 px-2 py-1 rounded">Fresh</span>
//                 <span className="bg-gray-200 px-2 py-1 rounded">Vegan</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;


import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../common/SummaryApi";
import CardProduct from "./CardProduct";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(250);
  const [searchQuery, setSearchQuery] = useState("");

  const carouselSlides = [
    { id: 1, title: "ORGANIC DAIRY", subtitle: "Fresh & Pure", description: "Premium organic milk, cheese, and yogurt from grass-fed cows. Rich in nutrients and free from artificial hormones.", bgImage: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=1200&h=600&fit=crop&crop=center", category: "Dairy Products" },
    { id: 2, title: "GLUTEN FREE", subtitle: "Wholesome & Healthy", description: "Certified gluten-free grains, flours, and baked goods. Perfect for celiac-friendly and health-conscious lifestyles.", bgImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=600&fit=crop&crop=center", category: "Gluten Free" },
    { id: 3, title: "FRESH HERBS", subtitle: "Garden to Table", description: "Aromatic organic herbs and spices grown without pesticides. Add natural flavor and health benefits to your meals.", bgImage: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&h=600&fit=crop&crop=center", category: "Herbs & Spices" },
    { id: 4, title: "ORGANIC PRODUCE", subtitle: "Farm Fresh Daily", description: "Seasonal organic fruits and vegetables harvested at peak ripeness. Bursting with flavor and vital nutrients.", bgImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop&crop=center", category: "Fresh Produce" },
    { id: 5, title: "NATURAL GRAINS", subtitle: "Ancient & Modern", description: "Whole grain cereals, quinoa, and ancient grains. Packed with fiber, protein, and essential minerals.", bgImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=600&fit=crop&crop=center", category: "Grains & Cereals" },
    { id: 6, title: "SUPERFOODS", subtitle: "Nutrient Powerhouse", description: "Organic superfoods like chia seeds, goji berries, and spirulina. Boost your health naturally.", bgImage: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&h=600&fit=crop&crop=center", category: "Superfoods" },
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.post(SummaryApi.getProduct.url, {
        categories: selectedCategories,
        price: maxPrice,
        sortBy,
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery.trim(),
      });
      const { data, totalCount } = response.data || {};
      setProducts(data || []);
      setTotalPages(Math.ceil((totalCount || 0) / itemsPerPage));
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => fetchProducts(), 400);
    return () => clearTimeout(delay);
  }, [selectedCategories, maxPrice, sortBy, currentPage, searchQuery]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide(prev => (prev + 1) % carouselSlides.length), 6000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevSlide = () => setCurrentSlide(prev => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  const goToNextSlide = () => setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      {/* Carousel */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="w-full px-4 py-4">
          <div className="relative w-full h-96 overflow-hidden bg-gray-900 rounded-lg shadow-2xl">
            {carouselSlides.map((slide, index) => (
              <div key={slide.id} className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide ? "opacity-100 translate-x-0" : index < currentSlide ? "opacity-0 -translate-x-full" : "opacity-0 translate-x-full"}`} style={{ backgroundImage: `url(${slide.bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative z-10 flex items-center justify-center h-full px-8">
                  <div className="text-center text-white max-w-4xl mx-auto">
                    <div className="mb-4"><span className="text-sm font-medium tracking-wider opacity-90">{slide.subtitle}</span></div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide">{slide.title}</h1>
                    <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto opacity-95">{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={goToPrevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
            <button onClick={goToNextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
              {carouselSlides.map((_, index) => (
                <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-125" : "bg-white bg-opacity-50 hover:bg-opacity-75"}`} />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20">
              <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${((currentSlide + 1) / carouselSlides.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters + Products */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar LEFT */}
          <div className="w-full lg:w-1/4 border border-green-500 rounded-md p-4 h-fit sticky top-24 shadow-sm max-h-[500px] overflow-y-auto">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Filter Products</h3>
            <div className="mb-4"><h4 className="font-semibold mb-2">Category</h4><label className="block"><input type="checkbox" className="mr-2" /> Fruits</label><label className="block"><input type="checkbox" className="mr-2" /> Vegetables</label><label className="block"><input type="checkbox" className="mr-2" /> Grains</label></div>
            <div className="mb-4"><h4 className="font-semibold mb-2">Price Range</h4><input type="range" className="w-full" min="0" max="1000" /><p className="text-sm mt-1 text-gray-600">Under ₹1000</p></div>
            {/* <div className="mb-4"><h4 className="font-semibold mb-2">Colors</h4><div className="flex gap-2"><div className="w-4 h-4 bg-blue-600 rounded-full"></div><div className="w-4 h-4 bg-red-500 rounded-full"></div><div className="w-4 h-4 bg-yellow-500 rounded-full"></div></div></div> */}
            <div className="mb-4"><h4 className="font-semibold mb-2">Weight</h4><label className="block"><input type="checkbox" className="mr-2" /> 500g</label><label className="block"><input type="checkbox" className="mr-2" /> 1kg</label><label className="block"><input type="checkbox" className="mr-2" /> 5kg</label></div>
            <div><h4 className="font-semibold mb-2">Tags</h4><div className="flex flex-wrap gap-2 text-sm"><span className="bg-gray-200 px-2 py-1 rounded">Organic</span><span className="bg-gray-200 px-2 py-1 rounded">Fresh</span><span className="bg-gray-200 px-2 py-1 rounded">Vegan</span></div></div>
          </div>

          {/* Products RIGHT */}
          <div className="w-full lg:w-3/4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              <h2 className="text-2xl font-semibold text-green-800">{products.length} Organic Products</h2>
              <div><label className="mr-2">Sort by:</label><select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }} className="px-4 py-2 border rounded-lg"><option value="featured">Featured</option><option value="priceLow">Price: Low to High</option><option value="priceHigh">Price: High to Low</option><option value="name">Name: A to Z</option></select></div>
            </div>
            {loading ? <div className="text-center py-20">Loading...</div> : products.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">{products.map((item, index) => <CardProduct key={index} data={item} />)}</div> : <div className="text-center py-20 text-gray-500">No products found.</div>}
            {totalPages > 1 && <div className="mt-10 flex justify-center items-center space-x-2">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50">«</button>
              {[...Array(totalPages)].map((_, i) => <button key={i} onClick={() => handlePageChange(i + 1)} className={`px-4 py-2 rounded-full ${currentPage === i + 1 ? "bg-green-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}>{i + 1}</button>)}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50">»</button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
