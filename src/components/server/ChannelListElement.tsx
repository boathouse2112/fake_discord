import { Link } from 'react-router-dom';
import { Channel } from '../../types';

const ChannelListElement = (props: { serverID: string; channel: Channel }) => {
  return (
    <Link to={`${props.channel.id}`}>
      <div className="flex gap-2 items-center cursor-pointer">
        <h1 className="text-white font-sans">{props.channel.name ?? ''}</h1>
      </div>
    </Link>
  );
};

export default ChannelListElement;
