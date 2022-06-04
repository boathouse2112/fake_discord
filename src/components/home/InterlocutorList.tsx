import InterlocutorListUser from "./InterlocutorListElement";

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
    <div className="flex-shrink-0 w-52 p-4 flex flex-col gap-2 bg-neutral-700">
      {drawInterlocutors()}
    </div>
  );
};

export default InterlocutorList;
