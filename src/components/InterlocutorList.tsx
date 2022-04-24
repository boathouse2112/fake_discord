import { v4 as uuid } from 'uuid';
import { useAvatar } from '../hooks';

const InterlocutorList = (props: { interlocutors: string[] }) => {
  const avatar = useAvatar('user_avatar.png');

  const drawInterlocutors = () => {
    return props.interlocutors.map((name) => (
      <div key={uuid()} className="flex gap-2 items-center">
        <div className="w-10 flex-shrink-0">
          <img src={avatar} alt="user avatar" className="rounded-full"></img>
        </div>
        <h1 className="text-white font-sans">{name}</h1>
      </div>
    ));
  };

  return (
    <div className="flex-shrink-0 w-52 p-4 flex flex-col gap-2 bg-neutral-700">
      {drawInterlocutors()}
    </div>
  );
};

export default InterlocutorList;
