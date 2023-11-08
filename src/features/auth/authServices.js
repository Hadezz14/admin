import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }
  return response.data;
};

const verifyotp = async (userData) => {
  const response = await axios.post(`${base_url}user/verify-otp`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};

const blockUser = async (userId) => {
  try {
    const response = await axios.put(
      `${base_url}user/block-user/${userId}`,
      {},
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const unblockUser = async (userId) => {
  const response = await axios.put(
    `${base_url}user/unblock-user/${userId}`,
    {},
    config
  );
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`${base_url}user/${userId}`);
  return response.data;
};

const updatePassword = async (password) => {
  try {
    const response = await axios.put(
      `${base_url}user/password`,
      { password }, // Pass the new password in the request body
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
const authService = {
  login,
  getOrders,
  getOrder,
  blockUser,
  unblockUser,
  deleteUser,
  updatePassword,
  verifyotp,
};

export default authService;
