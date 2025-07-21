// import React, { useEffect, useState } from 'react';
// import { useGlobalContext } from '../provider/GlobalProvider';
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// import AddAddress from '../components/AddAddress';
// import { useSelector } from 'react-redux';
// import AxiosToastError from '../utils/AxiosToastError';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import toast from 'react-hot-toast';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';

// const CheckoutPage = () => {
//   const {
//     notDiscountTotalPrice,
//     totalPrice,
//     totalQty,
//     fetchCartItem,
//     fetchOrder,
//   } = useGlobalContext();

//   const [openAddress, setOpenAddress] = useState(false);
//   const addressList = useSelector((state) => state.addresses.addressList);
//   const cartItemsList = useSelector((state) => state.cartItem.cart);
//   const [selectAddress, setSelectAddress] = useState(0);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const selectedAddress = addressList?.[selectAddress];

//   const isBuyNow = new URLSearchParams(location.search).get('mode') === 'buy';
//   const [buyNowProduct, setBuyNowProduct] = useState(null);

//   useEffect(() => {
//     if (isBuyNow) {
//       const stored = localStorage.getItem('buyNowProduct');
//       if (stored) {
//         try {
//           const product = JSON.parse(stored);
//           setBuyNowProduct({
//             productId: product,
//             quantity: 1,
//           });
//         } catch {
//           toast.error('Invalid Buy Now product data.');
//         }
//       }
//     }
//   }, [isBuyNow]);

//   const productList = isBuyNow ? [buyNowProduct] : cartItemsList;

//   const totalAmt = isBuyNow
//     ? buyNowProduct
//       ? (buyNowProduct.productId.price -
//           buyNowProduct.productId.price * (buyNowProduct.productId.discount / 100 || 0))
//       : 0
//     : totalPrice;

//   const totalQtyBuyNow = isBuyNow ? 1 : totalQty;

//   const handleCashOnDelivery = async () => {
//     if (!selectedAddress) {
//       toast.error('Please select a valid address');
//       return;
//     }

//     try {
//       const response = await Axios({
//         ...SummaryApi.CashOnDeliveryOrder,
//         data: {
//           list_items: productList,
//           addressId: selectedAddress._id,
//           subTotalAmt: totalAmt,
//           totalAmt: totalAmt,
//         },
//       });

//       const { data: responseData } = response;

//       if (responseData.success) {
//         toast.success(responseData.message);
//         localStorage.removeItem('buyNowProduct');
//         fetchCartItem?.();
//         fetchOrder?.();
//         navigate('/success', {
//           state: { text: 'Order' },
//         });
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   const handleOnlinePayment = async () => {
//     if (!selectedAddress) {
//       toast.error('Please select a valid address');
//       return;
//     }

//     try {
//       toast.loading('Redirecting to payment...');
//       const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
//       const stripePromise = await loadStripe(stripePublicKey);

//       const response = await Axios({
//         ...SummaryApi.payment_url,
//         data: {
//           list_items: productList,
//           addressId: selectedAddress._id,
//           subTotalAmt: totalAmt,
//           totalAmt: totalAmt,
//         },
//       });

//       const { data: responseData } = response;

//       localStorage.removeItem('buyNowProduct');
//       stripePromise.redirectToCheckout({ sessionId: responseData.id });

//       fetchCartItem?.();
//       fetchOrder?.();
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   return (
//     <section className="bg-blue-50 min-h-screen py-8">
//       <div className="container mx-auto px-4 flex flex-col lg:flex-row w-full gap-6">
//         {/* Address Section */}
//         <div className="w-full">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Address</h2>
//           <div className="bg-white p-4 rounded shadow-sm grid gap-4">
//             {addressList?.length > 0 ? (
//               addressList.map((address, index) => (
//                 <label
//                   key={index}
//                   htmlFor={'address' + index}
//                   className={!address.status ? 'hidden' : ''}
//                 >
//                   <div className="border rounded p-4 flex gap-3 hover:bg-gray-100">
//                     <input
//                       id={'address' + index}
//                       type="radio"
//                       value={index}
//                       checked={selectAddress === index}
//                       onChange={(e) => setSelectAddress(Number(e.target.value))}
//                       name="address"
//                       className="accent-green-700"
//                     />
//                     <div className="text-gray-800">
//                       <p className="font-medium">{address.address_line}</p>
//                       <p className="text-sm">{address.city}</p>
//                       <p className="text-sm">{address.state}</p>
//                       <p className="text-sm">{address.country} - {address.pincode}</p>
//                       <p className="text-sm">{address.mobile}</p>
//                     </div>
//                   </div>
//                 </label>
//               ))
//             ) : (
//               <p className="text-gray-600 text-sm">No address found. Please add one below.</p>
//             )}
//             <div
//               onClick={() => setOpenAddress(true)}
//               className="h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer text-green-700 font-semibold rounded hover:bg-blue-100"
//             >
//               + Add New Address
//             </div>
//           </div>
//         </div>

//         {/* Summary Section */}
//         <div className="w-full max-w-md bg-white p-6 shadow-md rounded-md">
//           <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
//           <div className="space-y-4 text-base text-gray-700">
//             {!isBuyNow && (
//               <div className="flex justify-between">
//                 <span className="font-medium">Items Total</span>
//                 <span className="flex items-center gap-2">
//                   <s className="text-gray-400">{DisplayPriceInRupees(notDiscountTotalPrice)}</s>
//                   <span className="font-semibold">{DisplayPriceInRupees(totalPrice)}</span>
//                 </span>
//               </div>
//             )}

//             <div className="flex justify-between">
//               <span className="font-medium">Quantity Total</span>
//               <span className="font-semibold">{totalQtyBuyNow} item(s)</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="font-medium">Delivery Charge</span>
//               <span className="text-green-700 font-semibold">Free</span>
//             </div>

//             <hr />

//             <div className="flex justify-between text-lg font-bold">
//               <span>Grand Total</span>
//               <span>{DisplayPriceInRupees(totalAmt)}</span>
//             </div>
//           </div>

//           <div className="mt-8 flex flex-col gap-4">
//             <button
//               className="w-full py-3 rounded bg-green-700 hover:bg-green-800 text-white font-semibold transition"
//               onClick={handleOnlinePayment}
//               disabled={!selectedAddress}
//             >
//               Pay Online
//             </button>

//             <button
//               className="w-full py-3 border-2 border-green-700 text-green-700 font-semibold rounded hover:bg-green-700 hover:text-white transition"
//               onClick={handleCashOnDelivery}
//               disabled={!selectedAddress}
//             >
//               Cash on Delivery
//             </button>
//           </div>
//         </div>
//       </div>

//       {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
//     </section>
//   );
// };

// export default CheckoutPage;
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import AddAddress from '../components/AddAddress';
import { useSelector } from 'react-redux';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutPage = () => {
  const {
    notDiscountTotalPrice,
    totalPrice,
    totalQty,
    fetchCartItem,
    fetchOrder,
  } = useGlobalContext();

  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector((state) => state.addresses.addressList);
  const cartItemsList = useSelector((state) => state.cartItem.cart);
  const [selectAddress, setSelectAddress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const selectedAddress = addressList?.[selectAddress];
  const isBuyNow = new URLSearchParams(location.search).get('mode') === 'buy';
  const [buyNowProduct, setBuyNowProduct] = useState(null);

  useEffect(() => {
    if (isBuyNow) {
      const stored = localStorage.getItem('buyNowProduct');
      if (stored) {
        try {
          const product = JSON.parse(stored);
          setBuyNowProduct({ productId: product, quantity: 1 });
        } catch {
          toast.error('Invalid Buy Now product data.');
        }
      }
    }
  }, [isBuyNow]);

  const productList = isBuyNow ? [buyNowProduct] : cartItemsList;
  const totalAmt = isBuyNow
    ? buyNowProduct
      ? (buyNowProduct.productId.price -
          buyNowProduct.productId.price * (buyNowProduct.productId.discount / 100 || 0))
      : 0
    : totalPrice;

  const totalQtyBuyNow = isBuyNow ? 1 : totalQty;

  const handleCashOnDelivery = async () => {
    if (!selectedAddress) return toast.error('Please select a valid address');
    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: productList,
          addressId: selectedAddress._id,
          subTotalAmt: totalAmt,
          totalAmt: totalAmt,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        localStorage.removeItem('buyNowProduct');
        fetchCartItem?.();
        fetchOrder?.();
        navigate('/success', { state: { text: 'Order' } });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleOnlinePayment = async () => {
    if (!selectedAddress) return toast.error('Please select a valid address');
    try {
      toast.loading('Redirecting to payment...');
      const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      const response = await Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: productList,
          addressId: selectedAddress._id,
          subTotalAmt: totalAmt,
          totalAmt: totalAmt,
        },
      });
      localStorage.removeItem('buyNowProduct');
      stripePromise.redirectToCheckout({ sessionId: response.data.id });
      fetchCartItem?.();
      fetchOrder?.();
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-blue-50 min-h-screen py-10 font-sans">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Address Section */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Address</h2>
          <div className="bg-white p-5 rounded shadow space-y-4">
            {addressList?.length > 0 ? (
              addressList.map((address, index) =>
                address.status ? (
                  <label key={index} htmlFor={`address${index}`}>
                    <div className="border rounded p-4 flex gap-3 hover:bg-gray-100">
                      <input
                        type="radio"
                        name="address"
                        id={`address${index}`}
                        value={index}
                        checked={selectAddress === index}
                        onChange={(e) => setSelectAddress(Number(e.target.value))}
                        className="accent-green-700 mt-1"
                      />
                      <div className="text-sm text-gray-800">
                        <p className="font-medium">{address.address_line}</p>
                        <p>{address.city}</p>
                        <p>{address.state}</p>
                        <p>{address.country} - {address.pincode}</p>
                        <p>{address.mobile}</p>
                      </div>
                    </div>
                  </label>
                ) : null
              )
            ) : (
              <p className="text-gray-600 text-sm">No address found. Please add one below.</p>
            )}

            <div
              onClick={() => setOpenAddress(true)}
              className="h-14 bg-blue-50 border-2 border-dashed border-green-700 flex justify-center items-center cursor-pointer text-green-700 font-semibold rounded hover:bg-blue-100 transition"
            >
              + Add New Address
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-full max-w-md bg-white p-6 shadow-md rounded-md">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
          <div className="space-y-4 text-base text-gray-700">
            {!isBuyNow && (
              <div className="flex justify-between">
                <span className="font-medium">Items Total</span>
                <span className="flex items-center gap-2">
                  <s className="text-gray-400">{DisplayPriceInRupees(notDiscountTotalPrice)}</s>
                  <span className="font-semibold">{DisplayPriceInRupees(totalPrice)}</span>
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="font-medium">Quantity Total</span>
              <span className="font-semibold">{totalQtyBuyNow} item(s)</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Delivery Charge</span>
              <span className="text-green-700 font-semibold">Free</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold">
              <span>Grand Total</span>
              <span>{DisplayPriceInRupees(totalAmt)}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <button
              className="w-full py-3 rounded bg-green-700 hover:bg-green-800 text-white font-semibold transition"
              onClick={handleOnlinePayment}
              disabled={!selectedAddress}
            >
              Pay Online
            </button>

            <button
              className="w-full py-3 border-2 border-green-700 text-green-700 font-semibold rounded hover:bg-green-700 hover:text-white transition"
              onClick={handleCashOnDelivery}
              disabled={!selectedAddress}
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;

