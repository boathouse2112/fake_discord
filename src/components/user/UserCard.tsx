import FastAverageColor from 'fast-average-color';
import { useEffect, useRef, useState } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import { useAvatar } from '../../hooks';

const UserCard = (props: { setUserCardIsOpen: (value: boolean) => void }) => {
  const avatar = useAvatar('user_avatar.png');

  // Close this card when the user clicks outside of it
  const ref = useRef(null);
  useOnClickOutside(ref, () => props.setUserCardIsOpen(false));

  const [avatarColor, setAvatarColor] = useState<string | undefined>(undefined);

  // Get the user's avatar
  useEffect(() => {
    const fac = new FastAverageColor();
    fac.getColorAsync(avatar).then(({ hex }) => {
      setAvatarColor(hex);
    });
  }, [avatar]);

  return (
    <div
      ref={ref}
      className="w-72 h-60 absolute rounded-md overflow-hidden bg-neutral-900"
    >
      <div
        className="h-16"
        style={avatarColor ? { backgroundColor: avatarColor } : undefined}
      ></div>
      <div className="h-44"></div>
    </div>
  );
};

export default UserCard;
