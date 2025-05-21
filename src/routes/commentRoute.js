import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import validateRequest from "../middleware/validateRequest.js";
import CommentValidationSchema from "../utils/validation/commentValidation.js";
import CommentController from "../controllers/CommentController.js";

const commentRoute = Router();

commentRoute.get(
  "/:postId",
  authenticateToken,
  CommentController.fetchCommentsByPostId
);
commentRoute.post(
  "/:postId",
  authenticateToken,
  validateRequest(CommentValidationSchema.createCommentSchema),
  CommentController.createComment
);
commentRoute.delete(
  "/post/:postId/comment/:commentId",
  authenticateToken,
  CommentController.deleteComment
);

export default commentRoute;
