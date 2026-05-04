import { useEffect, useState } from "react";
import type {
  Settings,
  MeetingTypeUI,
  MeetingTypeRequest,
} from "../models/settings.model";
import { getSettings, meetingType } from "../services/settings.service";
import type { ColorResult } from "react-color";

const defaultData: MeetingTypeUI[] = [
  {
    id: 1,
    name: "Internal Meetings",
    desc: "Team meetings, standups, reviews",
    status: "ACTIVE",
    color: { r: 66, g: 133, b: 244, a: 1 },
  },
  {
    id: 2,
    name: "Client Meetings",
    desc: "External client presentations",
    status: "ACTIVE",
    color: { r: 255, g: 112, b: 67, a: 1 },
  },
  {
    id: 3,
    name: "Executive Meetings",
    desc: "Board meetings, leadership sessions",
    status: "ACTIVE",
    color: { r: 168, g: 85, b: 247, a: 1 },
  },
];

export const useSettingsViewModel = () => {
  // const [settings, setSettings] = useState<Settings | null>(null);
  // const [loading, setLoading] = useState(false);
  const [meetingTypes, setMeetingTypes] = useState(defaultData);
  const [activePickerId, setActivePickerId] = useState<number | null>(null);

  //converting RGB to string
  const toRgbaString = (color: MeetingTypeUI["color"]) => {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  };

  const handleColorChange = (id: number, color: ColorResult) => {
    const safeColor = {
      r: color.rgb.r,
      g: color.rgb.g,
      b: color.rgb.b,
      a: color.rgb.a ?? 1,
    };
    setMeetingTypes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, color: safeColor } : item,
      ),
    );
  };

  const togglePicker = (id: number) => {
    setActivePickerId((prev) => (prev === id ? null : id));
  };

  const saveMeetingType = async (item: MeetingTypeUI) => {
    const payload: MeetingTypeRequest = {
      name: item.name,
      colorCode: toRgbaString(item.color),
      status: item.status,
    };
    await meetingType(payload);
  };

  // const loadSettings = async () => {
  //   try {
  //     const data = await getSettings();

  //     setSettings({
  //       ...data,
  //       profile: {
  //         firstName: data.profile?.firstName ?? "",
  //         lastName: data.profile?.lastName ?? "",
  //         email: data.profile?.email ?? "",
  //         phone: data.profile?.phone ?? "",
  //         department: data.profile?.department ?? "",
  //         role: data.profile?.role ?? "",
  //       },
  //     });
  //   } catch (error) {
  //     console.log("Failed to fetch settings");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   loadSettings();
  // }, []);

  // const updateProfileSection = (field: string, value: string) => {
  //   if (!settings) return;

  //   setSettings({
  //     ...settings,
  //     profile: {
  //       ...settings.profile,
  //       [field]: value,
  //     }, //update garxa single field inside profile.Uses spread operator (...) to keep other data unchanged. yesle update garxa only settings.profile.firstName="abcde"
  //   });
  // };

  return {
    // settings,
    // loading,

    meetingTypes,
    activePickerId,
    handleColorChange,
    togglePicker,
    saveMeetingType,
  };
};
