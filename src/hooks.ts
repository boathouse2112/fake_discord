import { useEffect, useState } from 'react';
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

export { useAvatar };
