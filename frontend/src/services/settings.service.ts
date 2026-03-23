import axios from "axios";
import type { Settings } from "../models/settings.model";

const GET_URL= "https://mocki.io/v1/b5b839b5-75a6-48ce-941e-5c6dd4bd4097";
const UPDATE_URL= "https://mocki.io/v1/7800acf0-968d-40d9-9518-c12d5fb40fab";

export const getSettings= async (): Promise<Settings> =>{
    // const res= await axios.get(GET_URL);
    // return res.data;
    try {
        const res = await axios.get(GET_URL);
        return res.data;
    } catch (error) {
        console.error("Error fetching settings", error);
        throw error;
    }   
}

export const updateSettings= async (data: Settings) =>{
    const res= await axios.put(UPDATE_URL, data);
    return res.data;
}
