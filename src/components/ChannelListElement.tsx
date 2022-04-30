import { Channel } from '../types';

const ChannelListElement = (props: {
  channel: Channel;
  setCurrentChannel: (channel: Channel) => void;
}) => {
  return (
    <div
      className="flex gap-2 items-center cursor-pointer"
      onClick={() => props.setCurrentChannel(props.channel)}
    >
      <h1 className="text-white font-sans">{props.channel.name ?? ''}</h1>
    </div>
  );
};

export default ChannelListElement;
