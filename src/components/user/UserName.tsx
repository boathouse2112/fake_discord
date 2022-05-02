import { useState } from 'react';
import UserCard from './UserCard';

const UserName = (props: { userName: string; userID: string }) => {
  const [userCardIsOpen, setUserCardIsOpen] = useState(false);

  return (
    <div className="flex gap-2">
      <h1
        onClick={() => setUserCardIsOpen(true)}
        className="cursor-pointer hover:underline"
      >
        {props.userName ?? ''}
      </h1>
      {/* Add a relative element to trigger the flex-gap even when the user card isn't rendered */}
      <div className="relative w-0 h-0">
        {userCardIsOpen && (
          <UserCard
            userID={props.userID}
            setUserCardIsOpen={setUserCardIsOpen}
          />
        )}
      </div>
    </div>
  );
};

export default UserName;
