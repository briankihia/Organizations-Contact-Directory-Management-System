import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) {
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const res = await axios.post(`${BASE_URL}/token/refresh/`, {
          refresh,
        });

        localStorage.setItem("access", res.data.access);
        axiosInstance.defaults.headers["Authorization"] =
          "Bearer " + res.data.access;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired. Please log in again.");
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
