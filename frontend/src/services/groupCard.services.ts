import api from "../api/api";
import type { groupCardRequest } from "../models/groupCard.model";

export const fetchGroupCards = async () => {
  try {
    const response = await api.get("/api/v1/group/list");
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching group cards:", error);
    throw error;
  }
};

export const deleteGroupCard = async (groupId: number) => {
  try {
    const response = await api.delete(`/api/v1/group/${groupId}/delete`);
    console.log("Group card deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting group card:", error);
    throw error;
  }
};
export const addGroupCard = async (groupData: groupCardRequest) => {
  try {
    const response = await api.post("/api/v1/group/add", groupData);
    console.log("Group card created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating group card:", error);
    throw error;
  }
};
export const EditGroupCard = async(id: number, data:groupCardRequest) =>{
  try {
    const res = await api.put(`/api/v1/group/${id}/update`, data);
  } catch (error) {
console.log(error);

  }
}