import Link from 'next/link';
import { ServerListTheme } from '../theme/theme';

type ServerLink = {
  id: string;
  name: string;
};

type ServerListProps = { theme: ServerListTheme; serverLinks: ServerLink[] };

const ServerList = ({ theme, serverLinks }: ServerListProps) => {
  const drawServerIcons = () => {
    return serverLinks.map(({ id, name }) => (
      <Link key={id} href={`/${id}`}>
        <a>
          <img
            src={'/discord_avatar.png'}
            alt={name}
            className="rounded-full"
          ></img>
        </a>
      </Link>
    ));
  };

  return (
    <nav
      className={[
        'w-20 h-full px-3 py-2',
        'flex flex-col gap-2',
        'bg-neutral-900 overflow-y-scroll scrollbar-hide',
      ].join(' ')}
    >
      {drawServerIcons()}
      <style jsx>{`
        nav {
          width: 5rem;
          height: 100%;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;

          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          background-color: ${theme.backgroundColor};
        }
        img {
          border-radius: 2rem;
          transition-property: border-radius;
          transition-duration: 0.25s;
        }
        img:hover {
          border-radius: 0.75rem;
        }
      `}</style>
    </nav>
  );
};

export type { ServerListProps };

export default ServerList;
