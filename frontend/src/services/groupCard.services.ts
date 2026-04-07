import api from "../api/api";
import type { groupCard } from "../models/groupCard.model";

// export const demoGroupCards = (): groupCard[] => {
//   return [
//     {
//       id: "1",
//       createdAt: " 2024-12-8",
//       description: "Frontend Team Members",
//       groupMembers: ["Sushant Basnet", "Shristi Yakami", "Sabin Mdhr"],
//       groupName: "Frontend Developers",
//     },
//     {
//       id: "3",
//       createdAt: " 2024-12-8",
//       description: "Frontend Team Members",
//       groupMembers: ["Sushant Basnet", "Shristi Yakami", "Sabin Mdhr"],
//       groupName: "Frontend Developers",
//     },
//     {
//       id: "2",
//       createdAt: " 2025-02-18",
//       description: "Complete product development team",
//       groupMembers: ["Jennifer Williams", "Robert Martinez", "Lisa Anderson"],
//       groupName: "Product Team",
//     },
//   ];
// };

export const fetchGroupCards = async () => {
  try {
    const response = await api.get("/api/v1/group/list");
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching group cards:", error);
    throw error;
  }
};
