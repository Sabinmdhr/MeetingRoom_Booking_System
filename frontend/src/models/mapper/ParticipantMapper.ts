import type {
  ParticipantResponse,
  ParticipantsRequest,
} from "../participants.model";
import { Roles } from "../constants/Roles";

export const mapParticipantResponseToRequest = (
  p: ParticipantResponse,
): ParticipantsRequest => {
  return {
    departmentId: p.departmentId,
    email: p.email,
    firstname: p.firstname,
    lastname: p.lastname,
    phoneNo: p.phoneNo,
    position: p.position,
    roleId: Roles[p.role as keyof typeof Roles].id,
    // password?: "",
  };
};
