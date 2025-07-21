
// import React, { useEffect, useRef, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import SummaryApi from '../common/SummaryApi'
// import Axios from '../utils/Axios'
// import AxiosToastError from '../utils/AxiosToastError'
// import { FaAngleRight, FaAngleLeft } from "react-icons/fa6"
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
// import Divider from '../components/Divider'
// import image1 from '../assets/minute_delivery.png'
// import image2 from '../assets/Best_Prices_Offers.png'
// import image3 from '../assets/Wide_Assortment.png'
// import { pricewithDiscount } from '../utils/PriceWithDiscount'
// import AddToCartButton from '../components/AddToCartButton'

// const ProductDisplayPage = () => {
//   const params = useParams()
//   let productId = params?.product?.split("-")?.slice(-1)[0]
//   const [data, setData] = useState({ name: "", image: [] })
//   const [image, setImage] = useState(0)
//   const imageContainer = useRef()

//   const fetchProductDetails = async () => {
//     try {
//       const response = await Axios({
//         ...SummaryApi.getProductDetails,
//         data: { productId }
//       })
//       const { data: responseData } = response
//       if (responseData.success) setData(responseData.data)
//     } catch (error) {
//       AxiosToastError(error)
//     }
//   }

//   useEffect(() => { fetchProductDetails() }, [params])

//   const handleScrollRight = () => {
//     imageContainer.current.scrollLeft += 100
//   }
//   const handleScrollLeft = () => {
//     imageContainer.current.scrollLeft -= 100
//   }

//   return (
//     <section className="container mx-auto px-4 py-10 font-sans text-gray-800">
//       <div className="grid lg:grid-cols-2 gap-10">
//         {/* IMAGE LEFT */}
//         <div>
//           {/* Main Image */}
//           <div className="bg-white aspect-square max-w-[500px] mx-auto rounded overflow-hidden shadow">
//             {data.image[image] && (
//               <img
//                 src={data.image[image]}
//                 alt={data.name}
//                 className="w-full h-full object-contain"
//               />
//             )}
//           </div>

//           {/* Dots */}
//           <div className="flex justify-center gap-3 my-3">
//             {data.image.map((_, index) => (
//               <div
//                 key={index}
//                 className={`w-4 h-4 rounded-full transition-all ${index === image ? 'bg-green-600' : 'bg-gray-300'}`}
//               ></div>
//             ))}
//           </div>

//           {/* Thumbnails */}
//           <div className="relative">
//             <div ref={imageContainer} className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
//               {data.image.map((img, i) => (
//                 <div key={i} className="w-20 h-20 cursor-pointer shadow rounded overflow-hidden">
//                   <img
//                     src={img}
//                     onClick={() => setImage(i)}
//                     className="w-full h-full object-contain"
//                     alt={`Thumbnail ${i + 1}`}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Arrows */}
//             <div className="hidden lg:flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-2">
//               <button onClick={handleScrollLeft} className="bg-white p-1 rounded-full shadow">
//                 <FaAngleLeft />
//               </button>
//               <button onClick={handleScrollRight} className="bg-white p-1 rounded-full shadow">
//                 <FaAngleRight />
//               </button>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="mt-6 hidden lg:block space-y-2 text-sm">
//             <h3 className="font-bold text-lg text-gray-700">Description</h3>
//             <p>{data.description}</p>
//             <p className="font-semibold mt-2">Unit</p>
//             <p>{data.unit}</p>
//             {data.more_details && Object.entries(data.more_details).map(([key, value]) => (
//               <div key={key}>
//                 <p className="font-semibold">{key}</p>
//                 <p>{value}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* DETAILS RIGHT */}
//         <div className="space-y-6">
//           <span className="bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold rounded-full">10 Min</span>
//           <h2 className="text-3xl font-bold">{data.name}</h2>
//           <p className="text-gray-600">{data.unit}</p>
//           <Divider />

//           {/* Price Section */}
//           <div>
//             <p className="font-medium text-lg mb-2">Price</p>
//             <div className="flex items-center gap-4">
//               <span className="text-xl font-semibold text-green-700">
//                 {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
//               </span>
//               {data.discount && (
//                 <>
//                   <span className="line-through text-gray-500">{DisplayPriceInRupees(data.price)}</span>
//                   <span className="text-green-600 font-semibold">{data.discount}% OFF</span>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Add to Cart or Out of Stock */}
//           {data.stock === 0 ? (
//             <p className="text-red-600 font-semibold">Out of Stock</p>
//           ) : (
//             <div><AddToCartButton data={data} /></div>
//           )}

//           {/* Why Shop From Us */}
//           <div className="mt-8">
//             <h2 className="text-2xl font-bold mb-4">Why shop from TAJA?</h2>
//             {[image1, image2, image3].map((img, i) => (
//               <div className="flex gap-4 mb-6 items-start" key={i}>
//                 <img src={img} className="w-16 h-16 object-contain" alt="benefit" />
//                 <div>
//                   <h4 className="font-semibold text-gray-800">
//                     {["Superfast Delivery", "Best Prices & Offers", "Wide Assortment"][i]}
//                   </h4>
//                   <p className="text-sm text-gray-600">
//                     {[
//                       "Get your order delivered from dark stores near you.",
//                       "Best price destination with offers directly from manufacturers.",
//                       "Choose from 5000+ products across all categories."
//                     ][i]}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Mobile Description */}
//           <div className="lg:hidden space-y-2 mt-8 text-sm">
//             <h3 className="font-bold text-lg text-gray-700">Description</h3>
//             <p>{data.description}</p>
//             <p className="font-semibold mt-2">Unit</p>
//             <p>{data.unit}</p>
//             {data.more_details && Object.entries(data.more_details).map(([key, value]) => (
//               <div key={key}>
//                 <p className="font-semibold">{key}</p>
//                 <p>{value}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default ProductDisplayPage

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6"
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/minute_delivery.png'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data, setData] = useState({ name: "", image: [] })
  const [image, setImage] = useState(0)
  const imageContainer = useRef()

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { productId }
      })
      const { data: responseData } = response
      if (responseData.success) setData(responseData.data)
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => { fetchProductDetails() }, [params])

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100
  }

  return (
    <section className="container mx-auto px-4 py-10 font-sans text-gray-800">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* IMAGE LEFT */}
        <div>
          {/* Main Image */}
          <div className="bg-white aspect-square max-w-[500px] mx-auto rounded overflow-hidden shadow">
            {data.image[image] && (
              <img
                src={data.image[image]}
                alt={data.name}
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 my-3">
            {data.image.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all ${index === image ? 'bg-green-600' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>

          {/* Thumbnails */}
          <div className="relative">
            <div ref={imageContainer} className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
              {data.image.map((img, i) => (
                <div key={i} className="w-20 h-20 cursor-pointer shadow rounded overflow-hidden">
                  <img
                    src={img}
                    onClick={() => setImage(i)}
                    className="w-full h-full object-contain"
                    alt={`Thumbnail ${i + 1}`}
                  />
                </div>
              ))}
            </div>

            {/* Arrows */}
            <div className="hidden lg:flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-2">
              <button onClick={handleScrollLeft} className="bg-white p-1 rounded-full shadow">
                <FaAngleLeft />
              </button>
              <button onClick={handleScrollRight} className="bg-white p-1 rounded-full shadow">
                <FaAngleRight />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 hidden lg:block space-y-2 text-sm">
            <h3 className="font-bold text-lg text-gray-700">Description</h3>
            <p>{data.description}</p>
            <p className="font-semibold mt-2">Unit</p>
            <p>{data.unit}</p>
            {data.more_details && Object.entries(data.more_details).map(([key, value]) => (
              <div key={key}>
                <p className="font-semibold">{key}</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS RIGHT */}
        <div className="space-y-6">
          <span className="bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold rounded-full">10 Min</span>
          <h2 className="text-3xl font-bold">{data.name}</h2>
          <p className="text-gray-600">{data.unit}</p>
          <Divider />

          {/* Price Section */}
          <div>
            <p className="font-medium text-lg mb-2">Price</p>
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold text-green-700">
                {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
              </span>
              {data.discount && (
                <>
                  <span className="line-through text-gray-500">{DisplayPriceInRupees(data.price)}</span>
                  <span className="text-green-600 font-semibold">{data.discount}% OFF</span>
                </>
              )}
            </div>
          </div>

          {/* Add to Cart or Out of Stock */}
          {data.stock === 0 ? (
            <p className="text-red-600 font-semibold">Out of Stock</p>
          ) : (
            <div><AddToCartButton data={data} /></div>
          )}

          {/* Why Shop From Us */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Why shop from TAJA?</h2>
            {[image1, image2, image3].map((img, i) => (
              <div className="flex gap-4 mb-6 items-start" key={i}>
                <img src={img} className="w-16 h-16 object-contain" alt="benefit" />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {["Superfast Delivery", "Best Prices & Offers", "Wide Assortment"][i]}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {[
                      "Get your order delivered from dark stores near you.",
                      "Best price destination with offers directly from manufacturers.",
                      "Choose from 5000+ products across all categories."
                    ][i]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Description */}
          <div className="lg:hidden space-y-2 mt-8 text-sm">
            <h3 className="font-bold text-lg text-gray-700">Description</h3>
            <p>{data.description}</p>
            <p className="font-semibold mt-2">Unit</p>
            <p>{data.unit}</p>
            {data.more_details && Object.entries(data.more_details).map(([key, value]) => (
              <div key={key}>
                <p className="font-semibold">{key}</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDisplayPage