// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import Divider from './Divider';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import { logout } from '../store/userSlice';
// import toast from 'react-hot-toast';
// import AxiosToastError from '../utils/AxiosToastError';
// import { HiOutlineExternalLink } from 'react-icons/hi';
// import isAdmin from '../utils/isAdmin';

// const UserMenu = ({ close }) => {
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const response = await Axios({ ...SummaryApi.logout });

//       if (response.data.success) {
//         close?.();
//         dispatch(logout());
//         localStorage.clear();
//         toast.success(response.data.message);
//         navigate('/');
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   const handleClose = () => {
//     close?.();
//   };

//   return (
//     <div className="font-sans text-gray-800 text-sm min-w-[200px]">
//       {/* Header */}
//       <div className="font-semibold text-base mb-1">My Account</div>
//       <div className="text-sm flex items-center gap-1 text-gray-700 mb-2">
//         <span className="max-w-[180px] truncate">{user.name || user.mobile}</span>
//         {user.role === 'ADMIN' && <span className="text-xs text-red-600 font-medium">(Admin)</span>}
//         <Link
//           onClick={handleClose}
//           to="/dashboard/profile"
//           className="hover:text-green-700 transition"
//         >
//           <HiOutlineExternalLink size={14} />
//         </Link>
//       </div>

//       <Divider />

//       {/* Links */}
//       <div className="mt-2 grid gap-1 text-sm text-gray-700">
//         {isAdmin(user.role) && (
//           <>
//             <Link
//               onClick={handleClose}
//               to="/dashboard/category"
//               className="px-2 py-1 hover:bg-green-100 rounded"
//             >
//               Category
//             </Link>
//             <Link
//               onClick={handleClose}
//               to="/dashboard/subcategory"
//               className="px-2 py-1 hover:bg-green-100 rounded"
//             >
//               Sub Category
//             </Link>
//             <Link
//               onClick={handleClose}
//               to="/dashboard/upload-product"
//               className="px-2 py-1 hover:bg-green-100 rounded"
//             >
//               Upload Product
//             </Link>
//             <Link
//               onClick={handleClose}
//               to="/dashboard/product"
//               className="px-2 py-1 hover:bg-green-100 rounded"
//             >
//               Product
//             </Link>
//           </>
//         )}

//         <Link
//           onClick={handleClose}
//           to="/dashboard/myorders"
//           className="px-2 py-1 hover:bg-green-100 rounded"
//         >
//           My Orders
//         </Link>
//         <Link
//           onClick={handleClose}
//           to="/dashboard/address"
//           className="px-2 py-1 hover:bg-green-100 rounded"
//         >
//           Save Address
//         </Link>
//         <button
//           onClick={handleLogout}
//           className="text-left px-2 py-1 hover:bg-green-100 rounded"
//         >
//           Log Out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserMenu;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Divider from './Divider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { logout } from '../store/userSlice';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { HiOutlineExternalLink } from 'react-icons/hi';
import isAdmin from '../utils/isAdmin';

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });

      if (response.data.success) {
        close?.();
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate('/');
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    close?.();
  };

  return (
    <div className="font-sans text-gray-900 text-sm min-w-[200px]">
      {/* Header */}
      <div className="font-semibold text-base mb-2">My Account</div>

      {/* User Info */}
      <div className="flex items-center justify-between text-sm text-gray-900 mb-2">
        <div className="truncate max-w-[160px] font-medium">
          {user.name || user.mobile}
          {user.role === 'ADMIN' && (
            <span className="ml-1 text-xs text-red-600 font-semibold">(Admin)</span>
          )}
        </div>
        <Link
          to="/dashboard/profile"
          onClick={handleClose}
          className="hover:text-green-700 transition"
          title="Go to Profile"
        >
          <HiOutlineExternalLink size={16} />
        </Link>
      </div>

      <Divider />

      {/* Links */}
      <div className="mt-3 space-y-1 text-sm text-gray-900">
        {isAdmin(user.role) && (
          <>
            <Link
              onClick={handleClose}
              to="/dashboard/category"
              className="block px-2 py-1 rounded hover:bg-green-100 transition"
            >
              Category
            </Link>
            <Link
              onClick={handleClose}
              to="/dashboard/subcategory"
              className="block px-2 py-1 rounded hover:bg-green-100 transition"
            >
              Sub Category
            </Link>
            <Link
              onClick={handleClose}
              to="/dashboard/upload-product"
              className="block px-2 py-1 rounded hover:bg-green-100 transition"
            >
              Upload Product
            </Link>
            <Link
              onClick={handleClose}
              to="/dashboard/product"
              className="block px-2 py-1 rounded hover:bg-green-100 transition"
            >
              Product
            </Link>
          </>
        )}

        <Link
          onClick={handleClose}
          to="/dashboard/myorders"
          className="block px-2 py-1 rounded hover:bg-green-100 transition"
        >
          My Orders
        </Link>
        <Link
          onClick={handleClose}
          to="/dashboard/address"
          className="block px-2 py-1 rounded hover:bg-green-100 transition"
        >
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left px-2 py-1 rounded hover:bg-green-100 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
