import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // adjust as needed
  withCredentials: true, // if using cookies/JWT
});

export default api;
