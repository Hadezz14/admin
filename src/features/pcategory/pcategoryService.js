import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);

  return response.data;
};
const createCategory = async (category) => {
  const request = config();
  const response = await axios.post(`${base_url}category/`, category, request);

  return response.data;
};

const getProductCategory = async (id) => {
  const request = config();
  const response = await axios.get(`${base_url}category/${id}`, request);

  return response.data;
};

const deleteProductCategory = async (id) => {
  const request = config();
  const response = await axios.delete(`${base_url}category/${id}`, request);

  return response.data;
};


const updateProductCategory = async (category) => {
  const request = config();
  try {
    const response = await axios.put(
      `${base_url}category/${category._id}`,
      { title: category.title },
      request
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
  
};
const pCategoryService = {
  getProductCategories,
  createCategory,
  getProductCategory,
  deleteProductCategory,
  updateProductCategory,
};

export default pCategoryService;
