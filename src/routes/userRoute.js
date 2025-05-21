import { Router } from "express";
import UserController from "../controllers/UserController.js";

import authenticateToken from "../middleware/authenticateToken.js";

const userRoute = Router();

userRoute.all("/all", authenticateToken, UserController.getAllUsers);
userRoute.get("/me", authenticateToken, UserController.getCurrentUserById);
userRoute.get(
  "/me-friends-list",
  authenticateToken,
  UserController.getUserFriendList
);
userRoute.post(
  "/me-friends/:friendId",
  authenticateToken,
  UserController.addAndRemoveFriend
);

export default userRoute;
