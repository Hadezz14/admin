import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
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
  const response = await axios.put(`${base_url}user/block-user/${userId}`,config);
  return response.data;
};

const unblockUser = async (userId) => {
  const response = await axios.put(`${base_url}user/unblock-user/${userId}`,config);
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`${base_url}user/${userId}`);
  return response.data;
};


const authService = {
  login,
  getOrders,
  getOrder,
  blockUser,
  unblockUser,
  deleteUser,
};

export default authService;
