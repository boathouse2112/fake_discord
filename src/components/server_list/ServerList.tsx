import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { fetchServerNames } from '../../firestoreQueries';
import avatar from './../../resources/discord_avatar.png';
import ServerIcon from './ServerIcon';

const useServerNames = (): { id: string; name: string }[] | undefined => {
  const { data: serverNames } = useQuery('server-names', () =>
    fetchServerNames()
  );
  return serverNames;
};

const ServerList = () => {
  const serverNames = useServerNames();

  const homeIcon = (
    <Link to={'/@me'}>
      <img src={avatar} alt={'Home'} className="rounded-full"></img>
    </Link>
  );

  const drawServerIcons = () => {
    console.log(serverNames);
    if (serverNames === undefined) return <></>;

    return serverNames.map(({ id, name }) => (
      <ServerIcon key={id} serverID={id} serverName={name} />
    ));
  };

  return (
    <nav
      className={[
        'w-20 h-full px-3 py-2',
        'flex flex-col gap-2',
        'bg-neutral-800 overflow-y-scroll scrollbar-hide',
      ].join(' ')}
    >
      <>
        {homeIcon}
        {drawServerIcons()}
      </>
    </nav>
  );
};

export default ServerList;
