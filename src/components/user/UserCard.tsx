import FastAverageColor from 'fast-average-color';
import { useEffect, useRef, useState } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import { useAvatar, useUser } from '../../hooks';

const UserCard = (props: {
  userID: string;
  setUserCardIsOpen: (value: boolean) => void;
}) => {
  const { data: user } = useUser(props.userID);
  const { data: avatarSrc } = useAvatar(user?.avatarPath);

  // Close this card when the user clicks outside of it
  const ref = useRef(null);
  useOnClickOutside(ref, () => props.setUserCardIsOpen(false));

  const [avatarColor, setAvatarColor] = useState<string | undefined>(undefined);

  // Get the user's avatar
  useEffect(() => {
    if (avatarSrc === undefined) return;

    const fac = new FastAverageColor();
    fac.getColorAsync(avatarSrc).then(({ hex }) => {
      setAvatarColor(hex);
    });
  }, [avatarSrc]);

  return (
    <>
      {avatarColor ? (
        <div
          ref={ref}
          className="w-72 h-60 absolute rounded-md overflow-hidden bg-neutral-900"
        >
          <div className="h-16" style={{ backgroundColor: avatarColor }}></div>
          <div className="h-44"></div>
        </div>
      ) : undefined}
    </>
  );
};

export default UserCard;
