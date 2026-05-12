import type {
  addDepartment,
  departmentList,
} from "../models/departmentList.model";
import api from "../api/api";

export const getDepartmentList = async (): Promise<departmentList[]> => {
  const response = await api.get("/api/v1/department/list");
  return response.data.data;
};
export const handleAddDepartment = async (data: addDepartment) => {
  const res = await api.post("/api/v1/department", data);
  return res.data;
};
export const handleEditDepartment = async (id: number, data: addDepartment) => {
  try {
    const res = await api.put(`/api/v1/department/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error editing department:", error);
    throw error;
  }
}
export const deleteDepartment = async(id: number) =>{
  try {
    const res = await api.patch(`/api/v1/department/${id}`)
    return res.data;
  } catch (error) {
    console.log(error);
    
  }
}