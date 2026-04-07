import type { departmentList } from "../models/departmentList.model";
import api from "../api/api";

export const getDepartmentList = async (): Promise<departmentList[]> => {
  const response = await api.get("/api/v1/department/list");
  return response.data.data;
}