// import { useEffect, useState } from "react";
// import { getPinnedAnnouncements } from "../services/announcements.service";
// // import { toast } from "react-toastify";

// const useDashboardViewModel = () => {
//   const [pinnnedData, setPinnnedData] = useState<any[]>([]);

//   const fetchPinnned = async (page = 0) => {
//     try {
//       const result = await getPinnedAnnouncements(page, 5);
//       setPinnnedData(result.data);
//     } catch (error) {
//       console.error("Failed to fetch pinned announcements", error);
//     }
//   };

//   useEffect(() => {
//     fetchPinnned();
//   }, []);

//   return { fetchPinnned, setPinnnedData, pinnnedData };
// };

// export default useDashboardViewModel;
