import { useQuery } from 'react-query';
import { Outlet, useParams } from 'react-router-dom';
import { fetchServer } from '../../firestoreQueries';
import { ServerData } from '../../types';
import ChannelList from './ChannelList';
import ChannelView from './ChannelView';
import ServerHeader from './ServerHeader';

const useServer = (serverID: string | undefined): ServerData | undefined => {
  const { data: server } = useQuery(['server', serverID], () =>
    serverID ? fetchServer(serverID) : undefined
  );
  return server;
};

const Server = () => {
  const { serverID, channelID: currentChannelID } = useParams();
  const server = useServer(serverID);

  const currentChannelName = (() => {
    if (currentChannelID === undefined) return undefined;

    return server?.channels.find((channel) => channel.id === currentChannelID)
      ?.name;
  })();

  return (
    <>
      {serverID ? (
        <div className="w-full flex flex-col">
          <ServerHeader
            serverName={server?.name}
            channelName={currentChannelName}
          />
          <div className="h-full flex">
            <ChannelList
              serverID={serverID}
              channels={server?.channels ?? []}
            />
            {
              // If this is the root server page, without any channel, render an empty ChannelView
              currentChannelID === undefined ? <ChannelView /> : undefined
            }
            <Outlet />
          </div>
        </div>
      ) : undefined}
    </>
  );
};

export default Server;
