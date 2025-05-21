import UserModel from "../models/UserModel.js";
import { formatUserForResponse } from "../utils/formatters/userFormatter.js";

class UserController {
  static async getAllUsers(re, res) {
    const users = await UserModel.getAllUsers();

    const formattedUsers = await Promise.all(
      users.map(async (user) => {
        const friendList = await UserModel.fetchUserListById(user.id);
        return formatUserForResponse({ friendList, user });
      })
    );

    res.status(200).json(formattedUsers);
  }

  static async getCurrentUserById(req, res) {
    const { userId } = req.user;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const friendList = await UserModel.fetchUserListById(userId);

    const formattedUser = formatUserForResponse({ friendList, user });

    res.status(201).json(formattedUser);
  }

  static async updateUserFriendsById(req, res) {
    const { updateUser } = req.body;

    const user = await UserModel.updateUserById({ id, updateUser });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  }

  static async addAndRemoveFriend(req, res) {
    const { userId } = req.user;
    const { friendId } = req.params;

    const userOne = await UserModel.findById(userId);
    const userTwo = await UserModel.findById(friendId);

    if (!userOne || !userTwo) {
      return res.status(404).json("User is not registered");
    }

    const relationExists = await UserModel.relationExist({ userId, friendId });
    let message = "";

    if (relationExists) {
      await UserModel.removeFriend({ userId, friendId });
      message = "User removed successfully";
    } else {
      await UserModel.addFriend({ userId, friendId });
      message = "User added successfully";
    }

    res.status(201).json({ message });
  }

  static async getUserFriendList(req, res) {
    const { userId } = req.user;
    const users = await UserModel.fetchUserListById(userId);

    if (!users) {
      return res.status(404).json({ message: "Not found Friend List" });
    }

    res.status(200).json(users);
  }
}

export default UserController;
