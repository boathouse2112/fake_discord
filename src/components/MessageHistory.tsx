import avatar from './../resources/user_avatar.png';

const MessageHistory = () => {
  return (
    <div className="flex-grow flex flex-col bg-neutral-600">
      <div className="p-6 flex flex-row gap-2">
        <div className="w-10 py-2">
          <img src={avatar} alt="user avatar" className="rounded-full"></img>
        </div>
        <div className="flex flex-col text-white">
          <div className="flex flex-row gap-2">
            <h1>James</h1>
            <h2>Yesterday at 2:00 PM</h2>
          </div>
          <div>
            <p>This is a message.</p>
            <p>
              A VERY LONG
              MESSAGE-------------------------------------------------------------------
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-row gap-2">
        <div className="w-10 py-2">
          <img src={avatar} alt="user avatar" className="rounded-full"></img>
        </div>
        <div className="flex flex-col text-white">
          <div className="flex flex-row gap-2">
            <h1>James</h1>
            <h2>Yesterday at 2:00 PM</h2>
          </div>
          <div>
            <p>This is a message.</p>
            <p>
              A VERY LONG
              MESSAGE-------------------------------------------------------------------
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageHistory;
