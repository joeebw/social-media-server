import db from "../config/db.js";

class UserModel {
  static async getAllUsers() {
    const result = await db.execute({
      sql: "SELECT id, email, firstName, lastName, location, occupation, profilePicture FROM users",
    });

    return result.rows;
  }

  static async findByEmail(email) {
    const result = await db.execute({
      sql: "SELECT id, email, firstName, lastName, location, occupation, profilePicture FROM users WHERE email = ?",
      args: [email],
    });
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  static async create({
    email,
    password,
    firstName,
    lastName,
    location,
    occupation,
    profilePicture,
  }) {
    const result = await db.execute({
      sql: "INSERT INTO users (email, password, firstName, lastName, location, occupation, profilePicture) VALUES (?, ?, ?, ?, ?, ?, ?)",
      args: [
        email,
        password,
        firstName,
        lastName,
        location,
        occupation,
        profilePicture,
      ],
    });
    return Number(result.lastInsertRowid);
  }

  static async findById(id) {
    const result = await db.execute({
      sql: `
        SELECT id, email, firstName, lastName, location, occupation, profilePicture 
        FROM users 
        WHERE id = ?`,
      args: [id],
    });
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  static async findByIdWithSensitiveData(id) {
    const result = await db.execute({
      sql: "SELECT id, email, password, firstName, lastName, location, occupation, profilePicture FROM users WHERE id = ?",
      args: [id],
    });
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  static async updateUserById({ id, updateUser }) {
    const updates = Object.keys(updateUser);
    if (updates.length === 0) {
      return this.findById(id);
    }

    const setClause = updates.map((key) => `${key} = ?`).join(", ");
    const values = updates.map((key) => updateDoc[key]);
    const args = [...values, id];

    const sql = `UPDATE users SET ${setClause} WHERE id = ?`;

    try {
      const updateResult = await db.execute({ sql, args });

      if (updateResult.rowsAffected > 0) return this.findById(id);

      return this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  static async relationExist({ userId, friendId }) {
    const result = await db.execute({
      sql: "SELECT COUNT(*) as count FROM user_friends WHERE userId = ? AND friendId = ?",
      args: [userId, friendId],
    });

    return result.rows.length > 0 && result.rows[0].count > 0;
  }

  static async addFriend({ userId, friendId }) {
    const result = await db.execute({
      sql: "INSERT INTO user_friends (userId, friendId) VALUES (?, ?)",
      args: [userId, friendId],
    });

    return Number(result.lastInsertRowid);
  }

  static async removeFriend({ userId, friendId }) {
    const result = await db.execute({
      sql: "DELETE FROM user_friends WHERE userId = ? AND friendId = ?",
      args: [userId, friendId],
    });
    return result.rowsAffected > 0;
  }

  static async fetchUserListById(userId) {
    const result = await db.execute({
      sql: `
        SELECT
          u.id,
          u.email,
          u.firstName,
          u.lastName,
          u.location,
          u.occupation,
          u.profilePicture
        FROM users u
        JOIN user_friends uf on uf.friendId = u.id
        WHERE uf.userId = ?
        `,
      args: [userId],
    });

    return result.rows;
  }
}

export default UserModel;
