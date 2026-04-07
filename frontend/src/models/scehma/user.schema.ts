import { z } from "zod";

export const UserSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .regex(/^(98|97)\d{8}$/, "Phone must start with 97 or 98 and be 10 digits"),
  department: z.string().min(2, "Department is required"),
  role: z.string().min(2, "Role is required"),
});

export const ParticipantSchema = z.object({
  firstname: z.string().min(2, "First name is required"),
  lastname: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  phoneNo: z
    .string()
    .regex(/^(98|97)\d{8}$/, "Phone must start with 97 or 98 and be 10 digits"),
  password: z.string().min(6, "Password be at least 8 characters."),
});

