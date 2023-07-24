import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);

  return response.data;
};
const createCategory = async (category) => {
  const response = await axios.post(`${base_url}category/`, category, config);

  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);

  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);

  return response.data;
};

const updateProductCategory = async (categoryID) => {
  try {
    // Make sure category.pCatData is not undefined before accessing its properties
    if (categoryID && categoryID.pCatData && categoryID.pCatData.title) {
      const response = await axios.put(
        `${base_url}category/${categoryID}`,
        { title: categoryID.pCatData.title },
        config
      );
      return response.data;
    } else {
      // Handle the case when category or category.pCatData is undefined
      throw new Error("Invalid category data");
    }
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
