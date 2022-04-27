import { useQuery } from 'react-query';
import { fetchUser } from '../firebaseQueries';
import { useAvatar } from '../hooks';

const useUserName = (userID: string) => {
  const { data: user } = useQuery(['user', userID], () => fetchUser(userID));
  const name = user?.name;

  return name;
};

const InterlocutorListUser = (props: { id: string }) => {
  const avatar = useAvatar('user_avatar.png');
  const name = useUserName(props.id);

  return (
    <div className="flex gap-2 items-center">
      <div className="w-10 flex-shrink-0">
        <img src={avatar} alt="user avatar" className="rounded-full"></img>
      </div>
      <h1 className="text-white font-sans">{name ?? ''}</h1>
    </div>
  );
};

export default InterlocutorListUser;
