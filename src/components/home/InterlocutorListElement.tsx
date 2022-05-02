import { useUserName } from '../../hooks';
import Avatar from '../user/Avatar';

const InterlocutorListUser = (props: {
  id: string;
  setCurrentInterlocutorID(id: string): void;
}) => {
  const name = useUserName(props.id);

  return (
    <div
      className="flex gap-2 items-center cursor-pointer"
      onClick={() => props.setCurrentInterlocutorID(props.id)}
    >
      <Avatar userID={props.id} />
      <h1 className="text-white font-sans">{name ?? ''}</h1>
    </div>
  );
};

export default InterlocutorListUser;
