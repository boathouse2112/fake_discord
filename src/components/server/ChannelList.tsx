import { Channel } from "../../types";
import ChannelListElement from "./ChannelListElement";
import UserPanel from "../user/UserPanel";

const ChannelList = (props: { serverId: string; channels: Channel[] }) => {
  const drawChannels = () => {
    return props.channels.map((channel) => (
      <ChannelListElement
        key={channel.id}
        serverId={props.serverId}
        channel={channel}
      />
    ));
  };

  return (
    <div className="flex-shrink-0 w-52 flex flex-col justify-between bg-neutral-700">
      <div className="p-4 flex flex-col gap-2">{drawChannels()}</div>
      <UserPanel />
    </div>
  );
};

export default ChannelList;
