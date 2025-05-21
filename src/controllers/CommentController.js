import PostModel from "../models/PostModel.js";
import CommentModel from "../models/CommentModel.js";
import { emitCommentDeleted, emitPostCreated } from "../utils/socketEmitter.js";

class CommentController {
  static async createComment(req, res) {
    const { userId } = req.user;
    const { postId } = req.params;
    const { comment } = req.body;

    const existPost = await PostModel.checkPostExist({ postId });

    if (!existPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const createdCommentId = await CommentModel.createComment({
      comment,
      userId,
      postId,
    });

    if (!createdCommentId) {
      return res.status(422).json({ message: "Comment not created" });
    }

    const newComment = await CommentModel.fetchCommentById({
      commentId: createdCommentId,
    });

    if (!newComment) {
      console.error(
        `Could not fetch created comment ${createdCommentId} for Socket.IO emission.`
      );
    }

    const post = await PostModel.fetchPostById({ postId: postId });

    emitPostCreated(req, post);

    res.status(201).json({ message: "Comment created successfully" });
  }

  static async fetchCommentsByPostId(req, res) {
    const { postId } = req.params;

    const existPost = await PostModel.checkPostExist({ postId });

    if (!existPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await CommentModel.fetchCommentsByPostId({ postId });

    res.status(200).json(comments);
  }

  static async deleteComment(req, res) {
    const { userId } = req.user;
    const { commentId, postId } = req.params;

    const isCommentDeleted = await CommentModel.deleteComment({
      userId,
      commentId,
    });

    if (!isCommentDeleted) {
      return res
        .status(422)
        .json({ message: "Error deleting comment. Please try again later." });
    }

    const post = await PostModel.fetchPostById({ postId: postId });

    emitPostCreated(req, post);

    res.status(200).json({ message: "Comment deleted successfully" });
  }
}

export default CommentController;
