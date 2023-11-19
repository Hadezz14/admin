import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const uploadImg = async (data) => {
  const request = config();
  const response = await axios.post(`${base_url}upload/`, data, request);
  return response.data;
};
const deleteImg = async (id) => {
  const request = config();
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`,
    request
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;