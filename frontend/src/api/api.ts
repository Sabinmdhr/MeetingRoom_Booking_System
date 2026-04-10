import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// export const axiosInstance = ({ baseUrl }: { baseUrl?: string }) => {
  // console.log("BASE_URL", baseUrl, BASE_URL);
  const instance =  axios.create({
    baseURL:  BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((config) =>{
    const token = localStorage.getItem("accessToken");

    if(token && config.headers){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
  );

  instance.interceptors.response.use((response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        console.log("refresh");

        const response = await axios.post(`${BASE_URL}/api/v1/access/token`, {
          "refreshToken": refreshToken,
        });

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (error) {
        console.log("Token refresh failed:", error);
        // Optionally, you can clear tokens and redirect to login page here
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "";
        return Promise.reject(error);
      }
  }
  }
  )
  // return instance;


// };
export default instance;

