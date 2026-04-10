export interface groupCardResponse {
  id: number;
  groupName: string;
  description: string;
  members: [
    {
      id: number;
      name: string;
    },
  ];
}

export interface groupCardRequest {
  groupName: string;
  description: string;
  member: number[];
}
