export const baseURL = import.meta.env.VITE_API_URL;

const SummaryApi = {
    register: {
        url: '/api/user/register',
        method: 'post',
    },
    login: {
        url: '/api/user/login',
        method: 'post',
    },
    forgot_password: {
        url: "/api/user/forgot-password",
        method: 'put',
    },
    forgot_password_otp_verification: {
        url: 'api/user/verify-forgot-password-otp',
        method: 'put',
    },
    resetPassword: {
        url: "/api/user/reset-password",
        method: 'put',
    },
    refreshToken: {
        url: 'api/user/refresh-token',
        method: 'post',
    },
    userDetails: {
        url: '/api/user/user-details',
        method: "get",
    },
    logout: {
        url: "/api/user/logout",
        method: 'get',
    },
    uploadAvatar: {
        url: "/api/user/upload-avatar",
        method: 'put',
    },
    updateUserDetails: {
        url: '/api/user/update-user',
        method: 'put',
    },

    // Category
    addCategory: {
        url: '/api/category/add-category',
        method: 'post',
    },
    getCategory: {
        url: '/api/category/get',
        method: 'get',
    },
    updateCategory: {
        url: '/api/category/update',
        method: 'put',
    },
    deleteCategory: {
        url: '/api/category/delete',
        method: 'delete',
    },
    filterProducts: {
    url: "/api/product/filter",
     method: "post"
    },

    // SubCategory
    createSubCategory: {
        url: '/api/subcategory/create',
        method: 'post',
    },
    getSubCategory: {
        url: '/api/subcategory/get',
        method: 'post',
    },
    updateSubCategory: {
        url: '/api/subcategory/update',
        method: 'put',
    },
    deleteSubCategory: {
        url: '/api/subcategory/delete',
        method: 'delete',
    },

    // Product
    createProduct: {
        url: '/api/product/create',
        method: 'post',
    },
    getProduct: {
        url: '/api/product/get',
        method: 'post',
    },
    getProductByCategory: {
        url: '/api/product/get-product-by-category',
        method: 'post',
    },

    getProductByCategoryAndSubCategory: {
        url: '/api/product/get-pruduct-by-category-and-subcategory',
        method: 'post',
    },
   getProductDetails: {
  url: '/api/product/get-product-details', // ✅ Matches backend route
  method: 'post',
},
    updateProductDetails: {
        url: "/api/product/update",
        method: 'put',
    },
   deleteProduct: {
    url: "/api/product/delete-product",
    method: 'delete',
},

    searchProduct: {
        url: '/api/product/search-product',  // <- match this to the backend
        method: 'post',
    },
    // Image Upload
    uploadImage: {
        url: '/api/file/upload',
        method: 'post',
    },

    // Cart
    addTocart: {
        url: "/api/cart/create",
        method: 'post',
    },
    getCartItem: {
        url: '/api/cart/get',
        method: 'get',
    },
    updateCartItemQty: {
        url: '/api/cart/update-qty',
        method: 'put',
    },
    deleteCartItem: {
        url: '/api/cart/delete-cart-item',
        method: 'delete',
    },

    // Address
    createAddress: {
        url: '/api/address/create',
        method: 'post',
    },
    getAddress: {
        url: '/api/address/get',
        method: 'get',
    },
    updateAddress: {
        url: '/api/address/update',
        method: 'put',
    },
    disableAddress: {
        url: '/api/address/disable',
        method: 'delete',
    },

    // Order
    CashOnDeliveryOrder: {
        url: "/api/order/cash-on-delivery",
        method: 'post',
    },
    payment_url: {
        url: "/api/order/checkout",
        method: 'post',
    },
    getAllProducts: {
        url: "/api/product/all",  // You can adjust this path if your backend differs
        method: "get",
    },
    getOrderItems: {
        url: '/api/order/order-list',
        method: 'get',
    },
};

export default SummaryApi;
