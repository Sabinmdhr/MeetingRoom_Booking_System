export interface ProfileSettings{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
}
export interface NotificationSettings{
    emailNotification: boolean;
    meetingReminders: boolean;
    bookingUpdates: boolean;
    announcements: boolean;
}
export interface ColorSettings{
    internal: string;
    client: string;
    executive: string;
}
export interface BookingSettings{
    defaultDurationHours: number;    
    bufferTimeMinutes: number;       
    autoDeclineConflicts: boolean;
}
export interface SecuritySettings{
    twoFactorEnabled: boolean;
}
export interface Settings{
    profile: ProfileSettings;
    notification: NotificationSettings;
    colors: ColorSettings;
    booking: BookingSettings;
    security: SecuritySettings;
}