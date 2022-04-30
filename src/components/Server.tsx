import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchServer } from '../firestoreQueries';
import { Channel, ServerData } from '../types';
import ChannelList from './ChannelList';
import ChannelView from './ChannelView';
import ServerHeader from './ServerHeader';

// Temporary server id
const SERVER_ID = 'serverA';

const useServer = (serverID: string): ServerData | undefined => {
  const { data: server } = useQuery(['server', serverID], () =>
    fetchServer(serverID)
  );
  return server;
};

const Server = () => {
  const server = useServer(SERVER_ID);
  const [currentChannel, setCurrentChannel] = useState<Channel | undefined>(
    undefined
  );

  return (
    <div className="w-full flex flex-col">
      <ServerHeader
        serverName={server?.name}
        channelName={currentChannel?.name}
      />
      <div className="h-full flex">
        <ChannelList
          channels={server?.channels ?? []}
          setCurrentChannel={setCurrentChannel}
        />
        <ChannelView />
      </div>
    </div>
  );
};

export default Server;
