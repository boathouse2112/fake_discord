const ServerHeader = (props: { interlocutorName: string | undefined }) => {
  return (
    <div className={"h-14 flex text-bold text-white"}>
      <div
        className={
          "flex-shrink-0 w-52 px-4 bg-neutral-700 border-b border-neutral-900 " +
          "flex items-center"
        }
      >
        Conversations
      </div>
      <div
        className={
          "w-full px-6 bg-neutral-600 border-b border-neutral-900 flex items-center"
        }
      >
        {props.interlocutorName ? (
          <h2
            className={
              "cursor-default " +
              "before:content-['@'] before:inline-block before:mr-2 " +
              "before:text-2xl before:italic"
            }
          >
            {props.interlocutorName}
          </h2>
        ) : undefined}
      </div>
    </div>
  );
};

export default ServerHeader;
