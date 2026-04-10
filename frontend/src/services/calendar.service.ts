import api from "../api/api";
export const getCalendarByWeek = async () => {
  try {
    const res = await api.post(`/api/v1/calender/week`);
    // console.log(res);

    return res.data;
  } catch (error) {
    console.error("Error fetching calendar by Week", error);
    throw error;
  }
};

export const getCalendarByMonth = async () => {
  try {
    const res = await api.post(`/api/v1/calender/month`);
    // console.log(res);

    return res.data;
  } catch (error) {
    console.error("Error fetching calendar by month", error);
    throw error;
  }
};

export const getCalendarByDay = async () => {
  try {
    const res = await api.post(`/api/v1/calender/day`);
    // console.log(res);

    return res.data;
  } catch (error) {
    console.error("Error fetching calendar by day", error);
    throw error;
  }
};
