import { useAvatar, useUserName } from '../../hooks';

const InterlocutorListUser = (props: {
  id: string;
  setCurrentInterlocutorID(id: string): void;
}) => {
  const avatar = useAvatar('user_avatar.png');
  const name = useUserName(props.id);

  return (
    <div
      className="flex gap-2 items-center cursor-pointer"
      onClick={() => props.setCurrentInterlocutorID(props.id)}
    >
      <div className="w-10 flex-shrink-0">
        <img src={avatar} alt="user avatar" className="rounded-full"></img>
      </div>
      <h1 className="text-white font-sans">{name ?? ''}</h1>
    </div>
  );
};

export default InterlocutorListUser;
