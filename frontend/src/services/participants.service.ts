import type { Participants, Columns } from "../models/participants.model";
export const DemoParticipants = (): Participants[] => {
  return [
    {
      id: "1",
      fullName: "Sarah Johnson",
      department: "Engineering",
      email: "sarah.j@fintech.com",
      numOfMeetings: 2,
      phoneNumber: "+1 (555) 123-4567",
      role: "Senior Engineer",
    },
    {
      id: "2",
      fullName: "Michael Chen",
      department: "Product",
      email: "michael.c@fintech.com",
      numOfMeetings: 8,
      phoneNumber: "+1 (555) 234-5678",
      role: "Senior ",
    },
    {
      id: "3",
      fullName: "Emily Rodriguez",
      department: "Engineering",
      email: "emily.r@fintech.com",
      numOfMeetings: 22,
      phoneNumber: "391179779",
      role: " Engineer",
    },
    {
      id: "4",
      fullName: "David Kim",
      department: "Product",
      email: "david.k@fintech.com",
      numOfMeetings: 21,
      phoneNumber: "39179779",
      role: "Senior Engineer",
    },
    {
      id: "5",
      fullName: "Sabin hhh",
      department: "Product",
      email: "Sabihr@12gmail.com",
      numOfMeetings: 12,
      phoneNumber: "391279779",
      role: "Senior Engineer",
    },
  ];
};

export const DemoColumns = (): Columns[] => {
  return [
    {
      id: "Name",
      label: "Name",
    },
    {
      id: "department",
      label: "Department",
    },
    {
      id: "contact",
      label: "Contact",
    },
    {
      id: "numOfMeetings",
      label: "Meetings",
    },
    {
      id: "actions",
      label: "Actions",
    },
  ];
};
