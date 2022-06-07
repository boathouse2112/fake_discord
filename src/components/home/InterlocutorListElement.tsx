import { useUser } from "../../firebase/hooks";
import Avatar from "../user/Avatar";

const InterlocutorListUser = (props: {
  id: string;
  setCurrentInterlocutorId(id: string): void;
}) => {
  const { data: user } = useUser(props.id);

  return (
    <div
      className="flex gap-2 items-center cursor-pointer"
      onClick={() => props.setCurrentInterlocutorId(props.id)}
    >
      <Avatar userId={props.id} />
      <h1 className="text-white font-sans">{user?.name ?? ""}</h1>
    </div>
  );
};

export default InterlocutorListUser;
