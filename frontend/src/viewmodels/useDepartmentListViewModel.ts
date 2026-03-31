import { useEffect, useState } from "react";
import { getDepartmentList } from "../services/departmentList.service";
import type { departmentList } from "../models/departmentList.model";

export const useDepartmentListViewModel = () => {
    const [departmentData, setDepartmentData] = useState<departmentList>({
      departmentName: "",
      id: "",
      description: "",
    });
  const [departmentList, setDepartmentList] = useState<departmentList[]>([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartmentList();
        setDepartmentList(data);
        setDepartmentData({
          departmentName: data[0].departmentName,
          id: data[0].id,
          description: data[0].description,
        })
      } catch (error) {
        console.error("Error fetching department list:", error);
      }
    };
    fetchDepartments();
  }, []);


  return { departmentList , departmentData};
};
