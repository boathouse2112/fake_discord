import { useQuery, UseQueryResult } from "react-query";
import { downloadImage, fetchUser } from "./firestoreQueries";
import { User } from "./types";

// Download the avatar from firebase
const useAvatar = (avatarPath: string | undefined) => {
  return useQuery(
    ["avatar", avatarPath],
    () => (avatarPath === undefined ? undefined : downloadImage(avatarPath)),
    { enabled: !!avatarPath }
  );
};

// Gets the user with the given id
const useUser = (userId: string | undefined): UseQueryResult<User> => {
  return useQuery(
    ["user", userId],
    () => (userId !== undefined ? fetchUser(userId) : undefined),
    { enabled: !!userId }
  );
};

// Convert a user id to a user name.
const useUserName = (userId: string) => {
  const { data: user } = useQuery(["user", userId], () => fetchUser(userId));
  return user?.name;
};

export { useAvatar, useUser, useUserName };
