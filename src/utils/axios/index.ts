import axios from "axios";

const BASE_URL = "https://shop-b6zj.onrender.com";

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
});

export const authInstance = axios.create({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
  baseURL: BASE_URL,
  timeout: 3000,
});