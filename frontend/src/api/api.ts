import axios from "axios";

const BASE_URL = "http://10.7.1.198:8081";

export const axiosInstance= axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },

})