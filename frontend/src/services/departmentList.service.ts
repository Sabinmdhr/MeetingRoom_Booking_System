import type { addDepartment, departmentList } from "../models/departmentList.model";
import api from "../api/api";

export const getDepartmentList = async (): Promise<departmentList[]> => {
  const response = await api.get("/api/v1/department/list");
  return response.data.data;
};
export const handleAddDepartment = async(data: addDepartment) => {
  const res = await api.post("/api/v1/department/", data);
  return res.data;
};
