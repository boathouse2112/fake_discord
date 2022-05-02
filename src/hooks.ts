import { useQuery, UseQueryResult } from 'react-query';
import { downloadImage, fetchUser } from './firestoreQueries';
import { User } from './types';

// Download the avatar from firebase
const useAvatar = (avatarPath: string | undefined) => {
  return useQuery(
    ['avatar', avatarPath],
    () => (avatarPath === undefined ? undefined : downloadImage(avatarPath)),
    { enabled: !!avatarPath }
  );
};

// Gets the user with the given ID
const useUser = (userID: string | undefined): UseQueryResult<User> => {
  return useQuery(
    ['user', userID],
    () => (userID !== undefined ? fetchUser(userID) : undefined),
    { enabled: !!userID }
  );
};

// Convert a user ID to a user name.
const useUserName = (userID: string) => {
  const { data: user } = useQuery(['user', userID], () => fetchUser(userID));
  const name = user?.name;

  return name;
};

export { useAvatar, useUser, useUserName };
