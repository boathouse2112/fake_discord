import { useQuery } from "react-query";
import { Outlet, useParams } from "react-router-dom";
import { fetchServer } from "../../firestoreQueries";
import { ServerData } from "../../types";
import ChannelList from "./ChannelList";
import ChannelView from "./ChannelView";
import ServerHeader from "./ServerHeader";

const useServer = (serverId: string | undefined): ServerData | undefined => {
  const { data: server } = useQuery(["server", serverId], () =>
    serverId ? fetchServer(serverId) : undefined
  );
  return server;
};

const Server = () => {
  const { serverId, channelId: currentChannelId } = useParams();
  const server = useServer(serverId);

  const currentChannelName = (() => {
    if (currentChannelId === undefined) return undefined;

    return server?.channels.find((channel) => channel.id === currentChannelId)
      ?.name;
  })();

  return (
    <div className="w-full flex flex-col">
      {serverId ? (
        <>
          <ServerHeader
            serverName={server?.name}
            channelName={currentChannelName}
          />
          <div className="h-full overflow-hidden flex">
            <ChannelList
              serverId={serverId}
              channels={server?.channels ?? []}
            />
            {
              // If this is the root server page, without any channel, render an empty ChannelView
              currentChannelId === undefined ? <ChannelView /> : undefined
            }
            <Outlet />
          </div>
        </>
      ) : undefined}
    </div>
  );
};

export default Server;
