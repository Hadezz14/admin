import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const createProduct = async (product) => {
  console.log(product)
  try{
    const response = await axios.post(`${base_url}product/`, product, config);
    return response.data;
  }
  catch(error){
    throw error;
  }
};

const updateProduct = async (product) => {
  try {
    console.log(product);
    const response = await axios.put(
      `${base_url}product/${product._id}`,
      {
        title: product.title,
        color: product.color,
        size: product.size,
        price: product.price,
      },
      config
    );
    console.log(response.data)
    return response.data;
    
  } catch (error) {
    throw new Error(error);
  }
};


const deleteProduct = async (product) => {
  console.log(product)

  try {
    const response = await axios.delete(`${base_url}product/${product._id}`,
    config
    );
    return response.data;
  } catch (error) {
    throw error
  }
};

const updateProductDiscount = async (productIds, discount) => {
  try {
    const response = await axios.put(
      `${base_url}product/discount`,
      { productIds: productIds,
        discount: discount },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteDiscount = async (productIds) => {
  try {
    const response = await axios.delete(`${base_url}product/delete-discount`, {
      data: { productIds: productIds },
      ...config,
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
