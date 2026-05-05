import { useEffect, useState } from "react";
import { getDepartmentList, handleAddDepartment, handleEditDepartment } from "../services/departmentList.service";
import type {
  addDepartment,
  departmentList,
} from "../models/departmentList.model";
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
  const [departmentFormData, setDepartmentFormData] = useState<addDepartment>({
    departmentName: "",
    description: "",
  });
  const [departmentFormState, setDepartmentFormState] = useState({
    open: false,
    mode: "edit" as "edit" | "add",
    department: null as departmentList | null,
  });

  const handleDepartmentFormOpen = (
    mode: "edit" | "add",
    department?: departmentList,
  ) => {
    setDepartmentFormState({
      open: true,
      mode: mode,
      department: department || null,
    });
  };
  const handleDepartmentFormClose = async () => {
    setDepartmentFormState((prev) => ({
      ...prev,
      open: false,
    }));
    await fetchDepartments();
  };
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

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setDepartmentFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const submitDepartment = async (data: addDepartment) => {

  try {
    await handleAddDepartment(data);
  } catch (error) {
    console.error("Error adding department:", error);
  }
  }
  const editDepartment = async (id: number, data: addDepartment) => {
    try {
      await handleEditDepartment(id, data);
    } catch (error) {
      console.error("Error editing department:", error);
    }
  }
  // Here you would typically send departmentFormData to your backend API
  useEffect(() => {
    fetchDepartments();
  }, []);

  return {
    departmentList,
    selectedDepartment,
    departmentItems,
    departmentFormState,
    handleDepartmentFormOpen,
    handleDepartmentFormClose,
    departmentFormData,
    setDepartmentFormData,
    handleChange,
    submitDepartment,
    editDepartment,
  };
};
