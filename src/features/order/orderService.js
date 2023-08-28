import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getOrders = async () => {
    const response = await axios.get(`${base_url}user/getallorders`,config);
    return response.data;
  };
  
 
const createOrder = async (order) => {
  const response = await axios.post(`${base_url}order/`, order, config);
  return response.data;
};

const updateOrderStatus = async (orderId, status) => {

  try {
    const response = await axios.put(
      `${base_url}user/order/update-order/${orderId}`,
       { status},
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const orderService = {
  getOrders,
  createOrder,
  updateOrderStatus,
};

export default orderService;
