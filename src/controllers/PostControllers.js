import PostModel from "../models/PostModel.js";
import UserModel from "../models/UserModel.js";
import CommentModel from "../models/CommentModel.js";
import { emitPostCreated, emitPostDeleted } from "../utils/socketEmitter.js";

// Create Post ✅
// Fetch all posts ✅
// Fetch user posts ✅
// Delete post ✅

class PostController {
  static async fetchAllPosts(req, res) {
    const posts = await PostModel.fetchAllPosts();

    const formattedPosts = await Promise.all(
      posts.map(async (post) => {
        const commentPost = await CommentModel.fetchCommentsByPostId({
          postId: post.id,
        });

        const formattedComments = commentPost.map((comment) => comment.text);

        return {
          ...post,
          comments: formattedComments,
          datePost: post.createdAt,
        };
      })
    );

    return res.status(200).json(formattedPosts);
  }

  static async fetchUserPostsById(req, res) {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPosts = await PostModel.fetchUserPostsById({ userId });

    const formattedUserPosts = await Promise.all(
      userPosts.map(async (post) => {
        const commentsPost = await CommentModel.fetchCommentsByPostId({
          postId: post.id,
        });

        const formattedComments = commentsPost.map((comment) => comment.text);

        return {
          ...post,
          comments: formattedComments,
          datePost: post.createdAt,
        };
      })
    );

    return res.status(200).json(formattedUserPosts);
  }

  static async createPost(req, res) {
    const { userId } = req.user;
    const {
      firstName,
      lastName,
      description,
      location,
      pictureId,
      picturePath,
      userPicturePath,
    } = req.body;

    const createdPostId = await PostModel.createPost({
      firstName,
      lastName,
      description,
      location,
      pictureId,
      picturePath,
      userId,
      userPicturePath,
    });

    if (!createdPostId) {
      return res.status(422).json({ message: "Post not created" });
    }

    const newPost = await PostModel.fetchPostById({ postId: createdPostId });
    if (!newPost) {
      console.error(
        `Could not fetch created post ${createdPostId} for Socket.IO emission.`
      );
    }

    const commentPost = await CommentModel.fetchCommentsByPostId({
      postId: newPost.id,
    });

    const formattedComments = commentPost.map((comment) => comment.text);

    const formmatedPost = {
      ...newPost,
      comments: formattedComments,
      datePost: newPost.createdAt,
    };

    emitPostCreated(req, formmatedPost);

    return res.status(201).json({ meesage: "Post created successfully" });
  }

  static async deletePost(req, res) {
    const { userId } = req.user;
    const { postId } = req.params;
    const userIdNum = Number(userId);
    const postIdNum = Number(postId);

    const isUserPost = await PostModel.checkUserPost({ userId, postId });

    if (!isUserPost) {
      return res.status(403).json({ message: "Access not allowed" });
    }

    const isPostDeleted = await PostModel.deletePost({ postId });

    if (!isPostDeleted) {
      return res.status(422).json({ message: "Post isn't deleted " });
    }

    emitPostDeleted(req, postIdNum, userIdNum);

    return res.status(200).json({ message: "Post deleted successfully" });
  }
}

export default PostController;
