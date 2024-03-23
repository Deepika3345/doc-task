import axios from "axios";

const API_URL = "https://doc-task.onrender.com/doc";
// GET DOCS
const getDocs = async (token) => {
  const option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "/", option);
  return response.data;
};
// Single Doc
const getDoc = async (id, token) => {
  const option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "/" + id, option);
  return response.data;
};

// Create Doc
const createDoc = async (formData, token) => {
  const option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, formData, option);

  return response.data;
};

// Delete Doc
const dltDoc = async (id, token) => {
  const option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + "/" + id, option);
  return response.data;
};
// Update Doc
const updateDocService = async (id, newData, token) => {
  const option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + "/" + id, newData, option);
  return response.data;
};

const docsServices = {
  getDocs,
  getDoc,
  createDoc,
  dltDoc,
  updateDocService,
};
export default docsServices;
