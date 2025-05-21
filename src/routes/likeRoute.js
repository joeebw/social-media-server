import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import LikeController from "../controllers/LikeController.js";

const likeRoute = Router();

likeRoute.post("/:postId", authenticateToken, LikeController.addAndRemoveLike);

export default likeRoute;
