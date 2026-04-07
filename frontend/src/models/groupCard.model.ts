export interface groupCard {
  id: string;
  groupName: string;
  description: string;
  createdAt: string;
  members: [
    {
      id: number;
      name: string;
    }
  ]
}
