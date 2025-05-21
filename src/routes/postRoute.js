import { Router } from "express";
import PostController from "../controllers/PostControllers.js";
import authenticateToken from "../middleware/authenticateToken.js";
import validateRequest from "../middleware/validateRequest.js";
import PostValidationSchema from "../utils/validation/postValidation.js";

const postRouter = Router();

postRouter.post(
  "/",
  authenticateToken,
  validateRequest(PostValidationSchema.createPostSchema),
  PostController.createPost
);
postRouter.delete("/:postId", authenticateToken, PostController.deletePost);
postRouter.get("/", authenticateToken, PostController.fetchAllPosts);
postRouter.get(
  "/user/:userId",
  authenticateToken,
  PostController.fetchUserPostsById
);

export default postRouter;
