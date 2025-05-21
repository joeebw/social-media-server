import db from "../config/db.js";

class CommentModel {
  static async fetchCommentsByPostId({ postId }) {
    const result = await db.execute({
      sql: "SELECT text FROM comments WHERE postId = ?",
      args: [postId],
    });
    return result.rows;
  }

  static async fetchCommentById({ commentId }) {
    const result = await db.execute({
      sql: "SELECT id, postId, text FROM comments WHERE id = ?",
      args: [commentId],
    });

    return result.rows[0];
  }

  static async createComment({ userId, postId, comment }) {
    const result = await db.execute({
      sql: "INSERT INTO comments(postId, userId, text) VALUES (?, ?, ?)",
      args: [postId, userId, comment],
    });

    return Number(result.lastInsertRowid);
  }

  static async deleteComment({ commentId, userId }) {
    const result = await db.execute({
      sql: "DELETE FROM comments WHERE id = ? AND userId = ?",
      args: [commentId, userId],
    });

    return result.rowsAffected > 0;
  }
}

export default CommentModel;
