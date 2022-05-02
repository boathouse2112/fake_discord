const ServerHeader = (props: {
  serverName: string | undefined;
  channelName: string | undefined;
}) => {
  return (
    <div className="flex text-white">
      <div className="flex-shrink-0 w-52 h-14 px-4 bg-neutral-700 border-b border-neutral-900 flex items-center">
        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold cursor-default">
          {props.serverName ?? ''}
        </h1>
      </div>
      <div className="w-full px-6 bg-neutral-600 border-b border-neutral-900 flex items-center">
        <h2 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold cursor-default">
          {props.channelName ? `# ${props.channelName}` : ''}
        </h2>
      </div>
    </div>
  );
};

export default ServerHeader;
