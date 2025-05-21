export const formatUserForResponse = ({ friendList, user }) => {
  const formattedFriendList = friendList.map((friend) => {
    return friend.id.toString();
  });

  return {
    ...user,
    id: user.id.toString(),
    friends: formattedFriendList,
    profilePicture: {
      url: user.profilePicture,
    },
  };
};
