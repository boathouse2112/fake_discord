import { Channel } from '../types';
import ChannelListElement from './ChannelListElement';

const ChannelList = (props: {
  channels: Channel[];
  setCurrentChannel: (channel: Channel) => void;
}) => {
  const drawChannels = () => {
    return props.channels.map((channel) => (
      <ChannelListElement
        key={channel.id}
        channel={channel}
        setCurrentChannel={props.setCurrentChannel}
      />
    ));
  };

  return (
    <div className="flex-shrink-0 w-52 p-4 flex flex-col gap-2 bg-neutral-700">
      {drawChannels()}
    </div>
  );
};

export default ChannelList;
