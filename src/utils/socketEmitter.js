// ! Pude conectar socket para los posts, me quede en comentarios y likes
// ! Creo que tengo que cambiar a todos para que emite el postData porque asi esta en el front que se actualiza mediante post
// ! Pero puedo revaluar esto en caso de que funcione mas que los comentarios esten separados.

// Helper function to get the Socket.IO instance (assuming it's attached to the Express app)
const getIoInstance = (req) => {
  if (!req || !req.app || !req.app.get) {
    console.error("Could not get Socket.IO instance: req or app missing.");
    return null;
  }
  const io = req.app.get("socketio");
  if (!io) {
    console.error("Socket.IO instance not found on app.get('socketio').");
  }
  return io;
};

// Emit event when a new post is created
const emitPostCreated = (req, postData) => {
  const io = getIoInstance(req);
  if (!io || !postData || !postData.id || !postData.userId) {
    // Ensure necessary data is available
    console.error(
      "Skipping postCreated emission: Socket.IO not available or missing post data."
    );
    return;
  }

  try {
    // Emit to the global feed room
    io.to("feed").emit("postCreated", postData);
    console.log(`Emitted 'postCreated' to 'feed' room for post ${postData.id}`);

    // Emit to the author's profile room
    io.to(`user-profile-${postData.userId}`).emit("postCreated", postData);
    console.log(
      `Emitted 'postCreated' to user profile room ${postData.userId} for post ${postData.id}`
    );
  } catch (error) {
    console.error("Error emitting postCreated event:", error);
  }
};

// Emit event when a post is deleted
const emitPostDeleted = (req, postId, postAuthorId) => {
  const io = getIoInstance(req);
  if (!io || !postId || !postAuthorId) {
    console.error(
      "Skipping postDeleted emission: Socket.IO not available or missing post/author ID."
    );
    return;
  }

  try {
    // Emit to the global feed room
    io.to("feed").emit("postDeleted", postId); // Emit just the ID
    console.log(`Emitted 'postDeleted' to 'feed' room for post ${postId}`);

    // Emit to the author's profile room
    io.to(`user-profile-${postAuthorId}`).emit("postDeleted", postId);
    console.log(
      `Emitted 'postDeleted' to user profile room ${postAuthorId} for post ${postId}`
    );
  } catch (error) {
    console.error("Error emitting postDeleted event:", error);
  }
};

// Emit event when a new comment is created
const emitCommentCreated = (req, commentData) => {
  const io = getIoInstance(req);
  if (!io || !commentData || !commentData.id || !commentData.postId) {
    console.error(
      "Skipping commentCreated emission: Socket.IO not available or missing comment/post ID."
    );
    return;
  }

  try {
    // Emit to the specific post's room
    io.to(commentData.postId).emit("commentCreated", commentData);
    console.log(
      `Emitted 'commentCreated' to post room ${commentData.postId} for comment ${commentData.id}`
    );
  } catch (error) {
    console.error("Error emitting commentCreated event:", error);
  }
};

// Emit event when a comment is deleted
const emitCommentDeleted = (req, commentId, commentPostId) => {
  const io = getIoInstance(req);
  if (!io || !commentId || !commentPostId) {
    console.error(
      "Skipping commentDeleted emission: Socket.IO not available or missing comment/post ID."
    );
    return;
  }

  try {
    io.to(commentPostId).emit("commentDeleted", commentId); // Emit just the ID
    console.log(
      `Emitted 'commentDeleted' to post room ${commentPostId} for comment ${commentId}`
    );
  } catch (error) {
    console.error("Error emitting commentDeleted event:", error);
  }
};

export {
  emitPostCreated,
  emitPostDeleted,
  emitCommentCreated,
  emitCommentDeleted,
};
