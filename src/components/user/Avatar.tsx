import { useAvatar, useUser } from '../../hooks';

/**
 * The avatar of the given user
 */
const Avatar = (props: { userID: string; width?: number }) => {
  const { data: user } = useUser(props.userID);
  const { data: avatarSrc } = useAvatar(user?.avatarPath);

  return (
    <div style={{ width: props.width ?? 40 }}>
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
