import { z } from "zod";

export const CreateProfileDto = z.object({
  fullname: z.string().optional(), //later on we will delete this line
  phone: z.string().optional(), //later on we will delete this line
  region: z.string().optional(), //later on we will delete this line
  address: z.string().optional(), //later on we will delete this line
  birthday: z.string().optional(), //later on we will delete this line
  gender: z.enum(["MALE", "FEMALE", "OTHER"], "Género no válido"),
  avatar: z.string().optional(),
  bio: z.string().optional(), //later on we will delete this line
});

export type CreateProfileDto = z.infer<typeof CreateProfileDto>;
