import { useEffect, useState } from "react";
import type { Settings } from "../models/settings.model";
import { getSettings, updateSettings } from "../services/settings.service";

export const useSettingsViewModel= () =>{
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        loadSettings();
    },[])

    const loadSettings = async()=>{
        try {
            const data= await getSettings();
            setSettings(data);
        } catch (error) {
            console.log("Failed to fetch settings");
        }
        finally{
            setLoading(false);
        }
    }

    const updateProfileSection = (field: string, value: string) =>{
        if (!settings) return;

        setSettings({
            ...settings,
            profile: {
                ...settings.profile,
                [field]: value,
            } //update garxa single field inside profile.Uses spread operator (...) to keep other data unchanged. yesle update garxa only settings.profile.firstName="abcde" 
        })
    }

    const saveSettings= async () =>{
        if(!settings) return;
        try {
            await updateSettings(settings); // updated settings lai backend ma pathauxa
            console.log("Settings updated successfully");
        } catch (error) {
            console.log("Error updating settings")
        }
    }

    return{
        settings, loading, updateProfileSection, saveSettings,
    }
}