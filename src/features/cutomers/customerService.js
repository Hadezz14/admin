import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`);

  return response.data;
};

// const blockUser = async (userId) => {
//   const response = await axios.put(
//     `${base_url}user/block-user/${userId}`,
//     {},
//     config
//   );
//   return response.data;
// };

// const unblockBblockUser = async (userId) => {
//   const response = await axios.put(
//     `${base_url}user/unblock-user/${userId}`,
//     {},
//     config
//   );
//   return response.data;
// };

const customerService = {
  getUsers,
  // blockUser,
  // unblockBblockUser,
};

export default customerService;
