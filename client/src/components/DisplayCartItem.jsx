import React from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import AddToCartButton from './AddToCartButton';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import imageEmpty from '../assets/empty_cart.webp';
import toast from 'react-hot-toast';

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector(state => state.cartItem.cart);
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      navigate("/checkout");
      if (close) close();
      return;
    }
    toast("Please Login");
  };

  return (
    <section className="bg-neutral-900 fixed inset-0 bg-opacity-70 z-50 font-sans">
      <div className="bg-white w-full max-w-sm h-full ml-auto shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Cart</h2>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-blue-50 p-3 flex flex-col gap-4">
          {cartItem.length > 0 ? (
            <>
              {/* Savings */}
              <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full text-sm font-medium">
                <p>Your total savings</p>
                <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
              </div>

              {/* Cart Items */}
              <div className="bg-white rounded-lg p-4 grid gap-5 text-sm">
                {cartItem.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 min-w-16 bg-gray-100 border rounded overflow-hidden">
                      <img
                        src={item?.productId?.image?.[0]}
                        alt="Product"
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 line-clamp-2">{item?.productId?.name}</p>
                      <p className="text-xs text-gray-500">{item?.productId?.unit}</p>
                      <p className="font-semibold text-gray-800">
                        {DisplayPriceInRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}
                      </p>
                    </div>
                    <div>
                      <AddToCartButton data={item.productId} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bill Details */}
              <div className="bg-white p-4 text-sm text-gray-800">
                <h3 className="font-semibold text-base mb-2">Bill Details</h3>
                <div className="flex justify-between">
                  <p>Items Total</p>
                  <p className="flex gap-2">
                    <s className="text-gray-400">{DisplayPriceInRupees(notDiscountTotalPrice)}</s>
                    <span>{DisplayPriceInRupees(totalPrice)}</span>
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Quantity Total</p>
                  <p>{totalQty} item{totalQty > 1 ? 's' : ''}</p>
                </div>
                <div className="flex justify-between">
                  <p>Delivery Charge</p>
                  <p className="text-green-600 font-medium">Free</p>
                </div>
                <div className="mt-2 font-bold flex justify-between text-base">
                  <p>Grand Total</p>
                  <p>{DisplayPriceInRupees(totalPrice)}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white flex flex-col justify-center items-center p-6 flex-1">
              <img src={imageEmpty} alt="Empty Cart" className="w-3/4 h-auto object-contain mb-4" />
              <Link
                to="/"
                onClick={close}
                className="block bg-green-600 px-4 py-2 text-white rounded font-medium"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {/* Footer (Fixed at Bottom) */}
        {cartItem.length > 0 && (
          <div className="p-2 bg-white border-t">
            <div className="bg-green-700 text-white px-4 py-3 rounded font-semibold flex justify-between items-center">
              <span>{DisplayPriceInRupees(totalPrice)}</span>
              <button onClick={redirectToCheckoutPage} className="flex items-center gap-1">
                Proceed <FaCaretRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;
