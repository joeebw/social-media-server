import db from "../config/db.js";

class LikeModel {
  static async addLike({ userId, postId }) {
    const result = await db.execute({
      sql: "INSERT INTO post_likes (userId, postId) VALUES (?, ?)",
      args: [userId, postId],
    });
    return result.rowsAffected > 0;
  }

  static async checkIfLiked({ userId, postId }) {
    const result = await db.execute({
      sql: "SELECT * FROM post_likes WHERE userId = ? AND postId = ?",
      args: [userId, postId],
    });

    return result.rows.length > 0;
  }

  static async removeLike({ userId, postId }) {
    const result = await db.execute({
      sql: "DELETE FROM post_likes WHERE userId = ? AND postId = ?",
      args: [userId, postId],
    });
    return result.rowsAffected > 0;
  }
}

export default LikeModel;
