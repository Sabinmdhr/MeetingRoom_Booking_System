import axios from "axios";

const BASE_URL= "http://161.97.158.11:8000/"

export const axiosInstance= axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },

})