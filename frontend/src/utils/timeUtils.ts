/**
 * Converts a time string HH:mm to total minutes since start of day
 */
export const timeStringToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
};

/**
 * Converts total minutes since start of day to HH:mm string
 */
export const minutesToTimeString = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

/**
 * Snaps minutes to the nearest interval (e.g., 5 minutes)
 */
export const snapToInterval = (minutes: number, interval: number): number => {
  return Math.round(minutes / interval) * interval;
};


/**
 * Clamps a value between min and max
 */
export const clamp = (val: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, val));
};


/**
 * Formats minutes into AM/PM string for display
 */
export const formatDisplayTime = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

/**
 * Calculates duration string (e.g., "30m", "1h 15m")
 */

export const formatDuration = (startMinutes: number, endMinutes: number): string => {
  const diff = endMinutes - startMinutes;
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  if (hours > 0) {
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  }
  return `${minutes}m`;
};
