import chalk from "chalk";

const registerSocketHandlers = (socket) => {
  console.log(chalk.green("a user connected:", socket.id));

  socket.on("disconnect", () => {
    console.log(chalk.red("user disconnected:", socket.id));
  });

  socket.on("joinPostRoom", (postId) => {
    if (!postId) {
      console.error(
        chalk.red(
          `Socket ${socket.id} attempted to join room with invalid postId`
        )
      );
      return;
    }

    socket.join(postId);
    console.log(chalk.blue(`${socket.id} joined post room: ${postId}`));
  });

  socket.on("leavePostRoom", (postId) => {
    if (!postId) {
      console.error(
        chalk.red(
          `Socket ${socket.id} attempted to leave room with invalid postId`
        )
      );
      return;
    }
    console.log(
      chalk.blue(
        `Socket ${
          socket.id
        } received leavePostRoom for postId: ${postId} (Type: ${typeof postId})`
      )
    );
    socket.leave(postId);
    console.log(chalk.blue(`${socket.id} left post room: ${postId}`));
  });

  socket.on("joinFeedRoom", () => {
    socket.join("feed");
    console.log(chalk.blue(`${socket.id} joined feed room`));
  });

  socket.on("leaveFeedRoom", () => {
    socket.leave("feed");
    console.log(chalk.blue(`${socket.id} left feed room`));
  });

  socket.on("joinProfileRoom", (profileUserId) => {
    if (!profileUserId) {
      console.error(
        chalk.red(
          `Socket ${socket.id} attempted to join profile room with invalid userId`
        )
      );
      return;
    }
    console.log(
      chalk.blue(
        `Socket ${
          socket.id
        } received joinProfileRoom for profileUserId: ${profileUserId} (Type: ${typeof profileUserId})`
      )
    );
    const roomName = `user-profile-${profileUserId}`;
    socket.join(roomName);
    console.log(chalk.blue(`${socket.id} joined profile room: ${roomName}`));
  });

  socket.on("leaveProfileRoom", (profileUserId) => {
    if (!profileUserId) {
      console.error(
        chalk.red(
          `Socket ${socket.id} attempted to leave profile room with invalid userId`
        )
      );
      return;
    }
    console.log(
      chalk.blue(
        `Socket ${
          socket.id
        } received leaveProfileRoom for profileUserId: ${profileUserId} (Type: ${typeof profileUserId})`
      )
    );
    const roomName = `user-profile-${profileUserId}`;
    socket.leave(roomName);
    console.log(chalk.blue(`${socket.id} left profile room: ${roomName}`));
  });
};

export default registerSocketHandlers;
