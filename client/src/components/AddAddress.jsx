import React from 'react';
import { useForm } from 'react-hook-form';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { IoClose } from 'react-icons/io5';
import { useGlobalContext } from '../provider/GlobalProvider';

const AddAddress = ({ close }) => {
  const { register, handleSubmit, reset, formState: { isValid } } = useForm({ mode: 'onChange' });
  const { fetchAddress } = useGlobalContext();

  const onSubmit = async (data) => {
    try {
      const response = await Axios({
        ...SummaryApi.createAddress,
        data: {
          address_line: data.addressline,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: data.pincode,
          mobile: data.mobile,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close?.();
        reset();
        fetchAddress();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-black fixed inset-0 z-50 bg-opacity-70 h-screen overflow-auto flex items-center justify-center font-sans">
      <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-md p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Add Address</h2>
          <button onClick={close} className="text-gray-600 hover:text-red-500">
            <IoClose size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            { id: 'addressline', label: 'Address Line' },
            { id: 'city', label: 'City' },
            { id: 'state', label: 'State' },
            { id: 'pincode', label: 'Pincode' },
            { id: 'country', label: 'Country' },
            { id: 'mobile', label: 'Mobile No.' },
          ].map(({ id, label }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block mb-1 font-semibold text-sm text-gray-800"
              >
                {label}*
              </label>
              <input
                type="text"
                id={id}
                placeholder={`Enter your ${label}`}
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                {...register(id, { required: true })}
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-2 rounded font-semibold text-white transition-all ${
              isValid ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAddress;

