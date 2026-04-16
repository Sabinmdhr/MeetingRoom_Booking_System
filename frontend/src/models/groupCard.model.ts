export interface groupCardResponse {
  id: number;
  groupName: string;
  description: string;
  members: [
    {
      memberId: number;
      memberName: string;
    },
  ];
}

export interface groupCardRequest {
  groupName: string;
  description: string;
  member: number[];
}
