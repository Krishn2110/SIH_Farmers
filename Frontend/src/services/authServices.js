import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


// Add token to requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  // login: async (credentials) => {
  //   const response = await axios.post(`${API_URL}/auth/login`, credentials);
  //   return response.data;
  // },

  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  signup: async (userData) => {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

//   getProfile: async () => {
//   const response = await axios.get(`${API_URL}/auth/profile`);
//   return response.data;
// },

getProfile: async () => {
    const token = localStorage.getItem("token");
    console.log("Token sending to backend:", token);
    const response = await axios.get(`${API_URL}/auth/profile`);
    return response.data;
  }
  
};

export default authService;