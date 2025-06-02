import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import validateRequest from "../middleware/validateRequest.js";
import authValidationSchema from "../utils/validation/authValidation.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateRequest(authValidationSchema.registerSchema),
  AuthController.register
);

authRouter.post(
  "/login",
  validateRequest(authValidationSchema.loginSchema),
  AuthController.login
);

authRouter.post("/login-guest", AuthController.loginGuest);

export default authRouter;
