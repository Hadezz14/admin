import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  return response.data;
};

const verifyotp = async (userData) => {
  const response = await axios.post(`${base_url}user/verify-otp`, userData);
  
  if (response.data) {
    await new Promise(resolve => {
      localStorage.setItem("user", JSON.stringify(response.data));
      resolve();
    });

    return response.data;
  }
};

const resendotp = async (userData) => {
  const response = await axios.post(`${base_url}user/resend-otp`, userData);
  return response.data;
};

const forgotPasswordAdmin = async (email) => {
  try {
    const response = await axios.post(`${base_url}user/admin-forget-password`, { email });
    return response.data;
  } catch (error) {
    // Handle error or return a custom error response
    throw error;
  }
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
  const request = config();
  try {
    const response = await axios.put(
      `${base_url}user/block-user/${userId}`,
      {},
      request
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const unblockUser = async (userId) => {
  const request = config();
  const response = await axios.put(
    `${base_url}user/unblock-user/${userId}`,
    {},
    request
  );
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`${base_url}user/${userId}`);
  return response.data;
};

const updatePassword = async (password) => {
  const request = config();
  try {
    const response = await axios.put(
      `${base_url}user/password`,
      { password }, // Pass the new password in the request body
      request
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
  resendotp,
  forgotPasswordAdmin
};

export default authService;
