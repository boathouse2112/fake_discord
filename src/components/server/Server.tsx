import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchServer } from '../../firestoreQueries';
import { Channel, ServerData } from '../../types';
import ChannelView from '../server/ChannelView';
import ChannelList from './ChannelList';
import ServerHeader from './ServerHeader';

// Temporary server id
const USER_ID = 'HHpwr6hXRpEg5loOSmWP';

const useServer = (serverID: string | undefined): ServerData | undefined => {
  const { data: server } = useQuery(['server', serverID], () =>
    serverID ? fetchServer(serverID) : undefined
  );
  return server;
};

const Server = () => {
  const { serverID } = useParams();
  const server = useServer(serverID);
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
        <ChannelView
          userID={USER_ID}
          serverID={server?.id}
          channel={currentChannel}
        />
      </div>
    </div>
  );
};

export default Server;
