import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const createProduct = async (product) => {
  const request = config();
  try{
    const response = await axios.post(`${base_url}product/`, product, request);
    return response.data;
  }
  catch(error){
    throw error;
  }
};

const updateProduct = async (product) => {
  const request = config();
  try {
    const response = await axios.put(
      `${base_url}product/${product._id}`,
      {
        title: product.title,
        color: product.color,
        size: product.size,
        price: product.price,
      },
      request
    );
    return response.data;
    
  } catch (error) {
    throw new Error(error);
  }
};


const deleteProduct = async (product) => {
  const request = config();

  try {
    const response = await axios.delete(`${base_url}product/${product._id}`,
    request
    );
    return response.data;
  } catch (error) {
    throw error
  }
};

const updateProductDiscount = async (productIds, discount) => {
  const request = config();
  try {
    const response = await axios.put(
      `${base_url}product/discount`,
      { productIds: productIds,
        discount: discount },
      request
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteDiscount = async (productIds) => {
  const request = config();
  try {
    const response = await axios.delete(`${base_url}product/delete-discount`, {
      data: { productIds: productIds }, ...request
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  updateProductDiscount,
  deleteDiscount
};

export default productService;
