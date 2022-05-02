import { useAvatar, useUser } from '../../hooks';

/**
 * The avatar of the given user
 */
const Avatar = (props: { userID: string }) => {
  const { data: user } = useUser(props.userID);
  const { data: avatarSrc } = useAvatar(user?.avatarPath);

  return (
    <div className="w-10 py-2">
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt={`${user?.name ?? ''} avatar`}
          className="rounded-full"
        />
      ) : undefined}
    </div>
  );
};

export default Avatar;
