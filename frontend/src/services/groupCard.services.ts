import type { groupCard } from "../models/groupCard.model";

export const demoGroupCards =(): groupCard[]  =>{

return [
  {
    id: "1",
    createdAt: " 2024-12-8",
    description: "Frontend Team Members",
    groupMemmbers: ["Sushant Basnet", "Shristi Yakami", "Sabin Mdhr"],
    groupName: "Frontend Developers",
  },
  {
    id: "2",
    createdAt: " 2025-02-18",
    description: "Complete product development team",
    groupMemmbers: ["Jennifer Williams", "Robert Martinez", "Lisa Anderson"],
    groupName: "Product Team",
  },
];


}