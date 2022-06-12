import Avatar from "./Avatar";
import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from "../../firebase/firebase";
import { useUser } from "../../firebase/hooks";
import { CogIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

const UserPanel = () => {
  const { data: authUser } = useAuthUser("auth-user", auth);
  const uid = authUser?.uid;
  const { data: user } = useUser(uid);

  const navigate = useNavigate();

  const openUserSettings = () => {
    navigate("/user-settings");
  };

  return (
    <div>
      {user ? (
        <div className={"w-full h-12 p-2 flex justify-between bg-neutral-800"}>
          <div className={"flex gap-2 items-center"}>
            <Avatar userId={user.id} width={32} />
            <h1
              className={
                "text-white font-semibold text-ellipsis cursor-default"
              }
            >
              {user.name}
            </h1>
          </div>
          <div className={"hover:cursor-pointer"}>
            <CogIcon onClick={openUserSettings} width={32} color={"white"} />
          </div>
        </div>
      ) : undefined}
    </div>
  );
};

export default UserPanel;
