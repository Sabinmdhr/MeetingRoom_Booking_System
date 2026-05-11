import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// const BASE_URL = "http://localhost:8081/";

// export const axiosInstance = ({ baseUrl }: { baseUrl?: string }) => {
// console.log("BASE_URL", baseUrl, BASE_URL);
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // ❗ If no response, just reject
    if (!error.response) {
      return Promise.reject(error);
    }

    // Handle 401
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        // no refresh token → logout
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(error);
      }

      try {
        console.log("Refreshing token...");

        const res = await axios.post(`${BASE_URL}/api/v1/access/token`, {
          refreshToken,
        });

        const newAccessToken = res.data?.data?.accessToken;
        const newRefreshToken = res.data.data?.refreshToken;

        //store new tokens
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // update header safely
        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        //retry original request
        return instance(originalRequest);
      } catch (err) {
        console.log("Refresh failed");

        localStorage.clear();
        window.location.href = "/";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
// return instance;

// };
export default instance;
