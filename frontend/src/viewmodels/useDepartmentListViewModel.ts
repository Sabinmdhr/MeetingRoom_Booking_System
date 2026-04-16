import { useEffect, useState } from "react";
import { getDepartmentList } from "../services/departmentList.service";
import type { departmentList } from "../models/departmentList.model";
import type { DropdownItems } from "../components/ui/Dropdown/CommonDropdown";

export const useDepartmentListViewModel = () => {
  // const [departmentData, setDepartmentData] = useState<departmentList>({
  //   departmentName: "",
  //   id: "",
  //   description: "",
  // });
  const [selectedDepartment, setSelectedDepartment] =
    useState<departmentList>();
  const [departmentItems, setDepartmentItems] = useState<DropdownItems[]>([]);
  const [departmentList, setDepartmentList] = useState<departmentList[]>([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartmentList();
        setDepartmentList(data);

        const Items: DropdownItems[] = data.map((dept) => ({
          label: dept.departmentName,
          id: dept.id,
        }));
        setDepartmentItems(Items);
      } catch (error) {
        console.error("Error fetching department list:", error);
      }
    };
    fetchDepartments();
  }, []);

  // const handleDepartmentChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
  //   const id  = Number(e.target.value);

  //     setSelectedDepartment(departmentList.find((dept) => dept.id === id));

  // }

  return { departmentList, selectedDepartment, departmentItems };
};
