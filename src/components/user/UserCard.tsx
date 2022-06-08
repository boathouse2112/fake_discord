import { Float } from "@headlessui-float/react";
import { Popover } from "@headlessui/react";
import FastAverageColor from "fast-average-color";
import { useEffect, useState } from "react";
import { useAvatar, useUser } from "../../firebase/hooks";
import Avatar from "./Avatar";
import UserCardInput from "./UserCardInput";

const UserCard = (props: { userName: string; userId: string }) => {
  const { data: user } = useUser(props.userId);
  const { data: avatarSrc } = useAvatar(user?.avatarPath);

  const [avatarColor, setAvatarColor] = useState<string | undefined>(undefined);

  // Get the user's avatar
  useEffect(() => {
    if (avatarSrc === undefined) return;

    const fac = new FastAverageColor();
    fac.getColorAsync(avatarSrc).then(({ hex }) => {
      setAvatarColor(hex);
    });
  }, [avatarSrc]);

  return (
    <Popover>
      <Float strategy="fixed" placement="right-start" offset={8} shift={56}>
        <Popover.Button>{props.userName}</Popover.Button>

        <Popover.Panel>
          <div className="w-72 rounded-md overflow-hidden bg-neutral-900">
            <div
              className="h-16"
              style={{ backgroundColor: avatarColor ?? "white" }}
            ></div>
            {user ? (
              <div className="relative h-10">
                <div
                  className={
                    "absolute left-3 bottom-0 w-20 h-20 rounded-full " +
                    "bg-neutral-900 flex justify-center items-center"
                  }
                >
                  <Avatar userId={user.id} width={64} />
                </div>
              </div>
            ) : undefined}
            <div className="h-44 my-4 px-4">
              <h1 className="text-xl font-bold tracking-wider">{user?.name}</h1>
              <p className="mt-4  inline-block break-words overflow-hidden overflow-ellipsis">
                Placeholder About
                meeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
              </p>
            </div>
            <div className="p-4 bg-neutral-900">
              <UserCardInput interlocutorId={props.userId} />
            </div>
          </div>
        </Popover.Panel>
      </Float>
    </Popover>
  );
};

export default UserCard;
