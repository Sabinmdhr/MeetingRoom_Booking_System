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


export const mappingGroupResponseToRequest = (p:groupCardResponse): groupCardRequest =>{
return {
  description: p.description,
  groupName: p.groupName,
  member: p.members.map((m) => m.memberId)
};
}