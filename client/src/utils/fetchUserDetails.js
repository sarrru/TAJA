// import Axios from "./Axios";
// import SummaryApi from "../common/SummaryApi";

// const fetchUserDetails = async () => {
//   try {
//     const response = await Axios({
//       ...SummaryApi.userDetails
//     });

//     // ✅ Add this log to see what the server sends back
//     console.log("✅ fetchUserDetails response:", response.data);

//     return response.data;
//   } catch (error) {
//     console.error("fetchUserDetails failed:", error.response?.data?.message || error.message);
//     throw error;
//   }
// };

// export default fetchUserDetails;


import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.userDetails,
    });

    console.log("✅ fetchUserDetails response:", response.data);
    return response.data;
  } catch (error) {
    console.warn("⛔ fetchUserDetails failed:", error?.response?.data?.message || error.message);

    if (error.response?.status === 401) {
      // Optional: clean up and redirect
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshToken");
      // window.location.href = "/login"; // Optional redirect
    }

    return { data: null };
  }
};

export default fetchUserDetails;

