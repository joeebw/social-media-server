import LikeModel from "../models/LikeModel.js";
import PostModel from "../models/PostModel.js";
import { emitPostCreated } from "../utils/socketEmitter.js";

class LikeController {
  static async addAndRemoveLike(req, res) {
    const { userId } = req.user;
    const { postId } = req.params;

    const existPost = await PostModel.fetchPostById({ postId });

    if (!existPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const likeExistsForUser = await LikeModel.checkIfLiked({ userId, postId });

    if (!likeExistsForUser) {
      const isLikedAdded = await LikeModel.addLike({ postId, userId });

      if (!isLikedAdded) {
        return res.status(422).json({ message: "Like not added" });
      }
      const newPost = await PostModel.fetchPostById({ postId });

      if (!newPost) {
        console.error(
          `Could not fetch created post ${createdPostId} for Socket.IO emission.`
        );
      }

      emitPostCreated(req, newPost);

      return res.status(200).json({ message: "Like Added" });
    }

    const isLikedRemoved = await LikeModel.removeLike({ userId, postId });

    if (!isLikedRemoved) {
      return res.status(422).json({ message: "Like not removed" });
    }

    const newPost = await PostModel.fetchPostById({ postId });

    if (!newPost) {
      console.error(
        `Could not fetch created post ${createdPostId} for Socket.IO emission.`
      );
    }

    emitPostCreated(req, newPost);

    res.status(200).json({ message: "Like removed" });
  }
}

export default LikeController;
