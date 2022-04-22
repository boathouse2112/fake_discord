import avatar from './../resources/user_avatar.png';

const InterlocutorList = () => {
  return (
    <div className="flex-shrink-0 w-52 p-4 flex flex-col gap-2 bg-neutral-700">
      <div className="flex gap-2 items-center">
        <div className="w-10">
          <img src={avatar} alt="user avatar" className="rounded-full"></img>
        </div>
        <h1 className="flex-shrink-0 text-white font-sans">Jimmy</h1>
      </div>
      <div className="flex gap-2 items-center">
        <div className="w-10">
          <img src={avatar} alt="user avatar" className="rounded-full"></img>
        </div>
        <h1 className="flex-shrink-0 text-white font-sans">Jimmy</h1>
      </div>
      <div className="flex gap-2 items-center">
        <div className="w-10">
          <img src={avatar} alt="user avatar" className="rounded-full"></img>
        </div>
        <h1 className="flex-shrink-0 text-white font-sans">Jimmy</h1>
      </div>
    </div>
  );
};

export default InterlocutorList;
