import axios from "axios";
import { json } from "react-router";




const API_URL = "https://doc-task.onrender.com/auth";
const register = async (formData) => {
  const response = await axios.post(API_URL + "/register", formData);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};
const logIn = async (formData) => {
  const response = await axios.post(API_URL + "/login", formData);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const authServices = {
  register,
  logIn,
};
export default authServices;
