import { z } from "zod";

export const ProfileUpdateSchema = z.object({
  firstname: z.string().min(2, "First name is required"),
  lastname: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  phoneNo: z
    .string()
    .regex(/^(98|97)\d{8}$/, "Phone must start with 97 or 98 and be 10 digits"),
  position: z.string().min(1, "Position is required"),
});
