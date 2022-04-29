import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchUser } from './firebaseQueries';
import defaultAvatar from './resources/discord_avatar.png';

const useAvatar = (avatarFileName: string) => {
  const [avatar, setAvatar] = useState(defaultAvatar);

  useEffect(() => {
    import(`./resources/${avatarFileName}`).then((module) => {
      console.log('avatar');
      setAvatar(module.default);
    });
  }, [avatarFileName]);

  return avatar;
};

// Convert a user ID to a user name.
const useUserName = (userID: string) => {
  const { data: user } = useQuery(['user', userID], () => fetchUser(userID));
  const name = user?.name;

  return name;
};

export { useAvatar, useUserName };
