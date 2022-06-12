import InterlocutorListUser from "./InterlocutorListElement";
import UserPanel from "../user/UserPanel";

const InterlocutorList = (props: {
  interlocutorIds: string[];
  setCurrentInterlocutorId(id: string): void;
}) => {
  const drawInterlocutors = () => {
    return props.interlocutorIds.map((id) => (
      <InterlocutorListUser
        key={id}
        id={id}
        setCurrentInterlocutorId={props.setCurrentInterlocutorId}
      />
    ));
  };

  return (
    <div className="flex-shrink-0 w-52 flex flex-col justify-between bg-neutral-700">
      <div className="p-4 flex flex-col gap-2">{drawInterlocutors()}</div>
      <UserPanel />
    </div>
  );
};

export default InterlocutorList;
