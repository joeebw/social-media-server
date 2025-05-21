import authRouter from "./authRoute.js";
import postRouter from "./postRoute.js";
import userRoute from "./userRoute.js";
import commentRoute from "./commentRoute.js";
import likeRoute from "./likeRoute.js";

const setupRoutes = (app) => {
  app.use("/auth", authRouter);
  app.use("/user", userRoute);
  app.use("/post", postRouter);
  app.use("/comment", commentRoute);
  app.use("/like", likeRoute);
};

export default setupRoutes;
