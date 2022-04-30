const ServerHeader = (props: {
  serverName: string | undefined;
  channelName: string | undefined;
}) => {
  return (
    <div className="flex text-white">
      <div className="flex-shrink-0 w-52 h-14  bg-neutral-700 border-b border-black">
        {props.serverName ?? ''}
      </div>
      <div className="w-full bg-neutral-600 border-b border-black">
        {props.channelName ?? ''}
      </div>
    </div>
  );
};

export default ServerHeader;
