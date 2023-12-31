import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getColors = async () => {
  const response = await axios.get(`${base_url}color/`);

  return response.data;
};
// const createColor = async (color) => {
//   const response = await axios.post(`${base_url}color/`, color, config);

//   return response.data;
// };
export const createColor = async (color) => {
  try {
    const response = await axios.post(`${base_url}color/`, color, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const updateColor = async (color) => {
  const request = config();
  const response = await axios.put(
    `${base_url}color/${color.id}`,
    { title: color.colorData.title },
    request
  );

  return response.data;
};
const getColor = async (id) => {
  const request = config();
  const response = await axios.get(`${base_url}color/${id}`, request);

  return response.data;
};

const deleteColor = async (id) => {
  const request = config();
  const response = await axios.delete(`${base_url}color/${id}`, request);

  return response.data;
};
const colorService = {
  getColors,
  createColor,
  updateColor,
  getColor,
  deleteColor,
};

export default colorService;
