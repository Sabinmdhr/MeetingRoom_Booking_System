import axios from "axios";
import api from "../api/api";
import type { changePassDataType, meetingTypeChange, MeetingTypeStatus, Settings } from "../models/settings.model";
import type { MeetingTypeRequest } from "../models/settings.model";

// const GET_URL = "https://mocki.io/v1/b5b839b5-75a6-48ce-941e-5c6dd4bd4097";
const GET_URL = "https://dummyjson.com/c/ab43-0141-42f5-a9a2";
const UPDATE_URL = "https://mocki.io/v1/7800acf0-968d-40d9-9518-c12d5fb40fab";

export const getSettings = async (): Promise<Settings> => {
  try {
    const res = await axios.get(GET_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching settings", error);
    throw error;
  }
};

export const updateSettings = async (data: Settings) => {
  const res = await axios.put(UPDATE_URL, data);
  return res.data;
};

export const meetingType= async(data: MeetingTypeRequest)=>{
  const res= await api.post("/api/v1/meeting-type", data);
  return res.data;
}

export const updateMeetingType= async(data: MeetingTypeRequest, id:number)=>{
  const res= await api.put(`/api/v1/update/${id}`, data);
  return res.data;
}

export const changeStatus= async(data: meetingTypeChange, id:number)=>{
  const res= await api.patch(`/api/v1/meeting-type/${id}/change-status`, data);
  return res.data;
}

export const changePassword = async(data: changePassDataType) =>{
  const res = await api.put("api/v1/change/password", data)
  return res.data
}