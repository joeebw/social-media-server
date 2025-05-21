import { z } from "zod";

const createCommentSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
});

export default {
  createCommentSchema,
};
