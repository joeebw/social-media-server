import db from "../config/db.js";

class PostModel {
  static async fetchAllPosts() {
    const result = await db.execute({
      sql: `
        SELECT p.id, p.createdAt, p.description, p.firstName, p.lastName, p.location, p.picturePath, p.userId, p.userPicturePath, p.pictureId, COUNT(l.postId) as likes 
        FROM posts p
        LEFT JOIN post_likes l ON l.postId = p.id
        GROUP BY p.id
        ORDER BY p.createdAt DESC
        `,
    });
    return result.rows;
  }

  static async fetchPostById({ postId }) {
    const result = await db.execute({
      sql: `
        SELECT p.id, p.createdAt, p.description, p.firstName, p.lastName, p.location, p.picturePath, p.userId, p.userPicturePath, p.pictureId, COUNT(l.postId) as likes 
        FROM posts p
        LEFT JOIN post_likes l ON l.postId = p.id
        WHERE p.id = ? 
        GROUP BY p.id
        `,
      args: [postId],
    });

    return result.rows[0];
  }

  static async fetchUserPostsById({ userId }) {
    const result = await db.execute({
      sql: `
        SELECT p.id, p.createdAt, p.description, p.firstName, p.lastName, p.location, p.picturePath, p.userId, p.userPicturePath, p.pictureId, COUNT(l.postId) as likes 
        FROM posts p
        LEFT JOIN post_likes l ON l.postId = p.id
        WHERE p.userId = ? 
        GROUP BY p.id
        ORDER BY p.createdAt DESC
        `,
      args: [userId],
    });
    return result.rows;
  }

  static async createPost({
    userId,
    firstName,
    lastName,
    location,
    description,
    userPicturePath,
    picturePath,
    pictureId,
  }) {
    const result = await db.execute({
      sql: "INSERT INTO posts (userId, firstName, lastName, location, description, userPicturePath, picturePath, pictureId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      args: [
        userId,
        firstName,
        lastName,
        location,
        description,
        userPicturePath,
        picturePath,
        pictureId,
      ],
    });

    return Number(result.lastInsertRowid);
  }

  static async checkUserPost({ postId, userId }) {
    const result = await db.execute({
      sql: "SELECT id, userId FROM posts WHERE id = ? AND userId = ?",
      args: [postId, userId],
    });

    return result.rows.length > 0;
  }

  static async checkPostExist({ postId }) {
    const result = await db.execute({
      sql: "SELECT * FROM posts WHERE id = ?",
      args: [postId],
    });

    return result.rows.length > 0;
  }

  static async deletePost({ postId }) {
    const result = await db.execute({
      sql: "DELETE FROM posts WHERE id = ?",
      args: [postId],
    });
    return result.rowsAffected > 0;
  }
}

export default PostModel;
