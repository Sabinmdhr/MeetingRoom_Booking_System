import { useEffect, useState, useRef  } from "react";
import type {
  Settings,
  MeetingTypeUI,
  MeetingTypeRequest,
  meetingTypeChange,
} from "../models/settings.model";
import {
  meetingType,
  changeStatus,
  updateMeetingType,
} from "../services/settings.service";
import type { ColorResult } from "react-color";
import { getAllMeetingType } from "../services/report.service";

export const useSettingsViewModel = () => {
  const [meetingTypes, setMeetingTypes] = useState<MeetingTypeUI[]>([]);
  const [activePickerId, setActivePickerId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const[selectedId, setSelectedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
const [addForm, setAddForm] = useState<boolean>(false);
  const [openPicker, setOpenPicker] = useState<boolean>(false);

  const initialMeetingTypeFormData:MeetingTypeRequest = { name: "", colorCode: "(0,0,255)", status: "ACTIVE" }
  const [meetingTypeFormData, setMeetingTypeFormData] =
    useState<MeetingTypeRequest>(initialMeetingTypeFormData);

  const togglePicker = (id: number) => {
    setActivePickerId((prev) => (prev === id ? null : id));
  };

  const fetchMeetingType = async () => {
    try {
      const res = await getAllMeetingType();
      setMeetingTypes(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchMeetingType();
  }, []);

  const addMeetingType = async (data: MeetingTypeRequest) => {
    try {
      await meetingType(data);
      setAddForm(false);
      setMeetingTypeFormData(initialMeetingTypeFormData);
      fetchMeetingType();
    } catch (error) {
      console.log(error);
    }
  };

  const handleColorChange = async (id: number, color: ColorResult) => {
    const { r, g, b } = color.rgb;

    const rgb = `(${r}, ${g}, ${b})`;
    const selectedItem = meetingTypes.find((item) => item.id === id);
    if (!selectedItem) return;

    const updatedItem = { ...selectedItem, colorCode: rgb };

    try {
      const res = await updateMeetingType(updatedItem, id);
      setMeetingTypes((prev)=> prev.map((item)=> item.id === id ? {...item, colorCode: rgb} : item))
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateMeetingType= async(item: MeetingTypeUI)=>{
    try {
    const payload: MeetingTypeRequest={
      name: item.name,
      colorCode: item.colorCode,
      status: item.status,
    }
    await updateMeetingType(payload, item.id);
    setEditingId(null);
    } catch (error) {
      console.log("Update failed", error);
    }
  }

    const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (pickerRef.current && !pickerRef.current.contains(target)) {
        setActivePickerId(null); // close picker
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

const deleteMeetingType= async(id: number)=>{
  const data:meetingTypeChange = {status:"INACTIVE"}
  await changeStatus(data, id);
    fetchMeetingType();
  // setMeetingTypes((prev)=> prev.map((item)=> item.id === id? {...item, status: "INACTIVE"}: item))

}

  return {
    meetingTypes,
    setMeetingTypes,
    activePickerId,
    setActivePickerId,
    handleColorChange,
    togglePicker,
    addMeetingType,
    pickerRef,
    openDialog,
    setOpenDialog,
    deleteMeetingType,
    selectedId,
    setSelectedId,
    editingId, setEditingId,
    handleUpdateMeetingType,
    addForm, setAddForm,
    openPicker, setOpenPicker,
    meetingTypeFormData, setMeetingTypeFormData,
  };
};
