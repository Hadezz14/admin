import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getCoupons = async () => {
  const request = config();
  const response = await axios.get(`${base_url}coupon/`, request);

  return response.data;
};

const createCoupons = async (coupon) => {
  const request = config();
  const response = await axios.post(`${base_url}coupon/`, coupon, request);

  return response.data;
};
const updateCoupon = async (coupon) => {
  const request = config();
  try {
    const response = await axios.put(
      `${base_url}coupon/${coupon._id}`,
      {
        name: coupon.name,
        discount: coupon.discount,
      },
      request
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
  
};

const getCoupon = async (id) => {
  const request = config();
  const response = await axios.get(`${base_url}coupon/${id}`, request);

  return response.data;
};

const deleteCoupon = async (id) => {
  const request = config();
  const response = await axios.delete(`${base_url}coupon/${id}`, request);

  return response.data;
};
const couponService = {
  getCoupons,
  createCoupons,
  deleteCoupon,
  getCoupon,
  updateCoupon,
};

export default couponService;
