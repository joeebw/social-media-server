// * Later I need to user this formmater in posts controllers for better implementation.
export const formatUserPostsForResponse = ({ userPosts, allComments = [] }) => {
  const commentsByPostId = allComments.reduce((acc, comment) => {
    if (!acc[comment.postId]) {
      acc[comment.postId] = [];
    }
    acc[comment.postId].push(comment);
    return acc;
  }, {});

  return userPosts.map((postData) => {
    const commentsForThisPost = commentsByPostId[postData.id] || [];

    const formattedCommentsText = commentsForThisPost.map(
      (comment) => comment.text
    );

    return {
      ...postData,
      comments: formattedCommentsText,
    };
  });
};
