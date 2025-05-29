import { z } from "zod";

const createPostSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().optional(),
  pictureId: z.string().min(1, "Picture id is required").nullable(),
  picturePath: z.string().min(1, "Picture path is required").nullable(),
  userPicturePath: z.string().min(1, "User picture path is required"),
});

export default {
  createPostSchema,
};
