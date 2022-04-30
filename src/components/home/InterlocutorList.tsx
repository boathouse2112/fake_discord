import InterlocutorListUser from './InterlocutorListElement';

const InterlocutorList = (props: {
  interlocutorIDs: string[];
  setCurrentInterlocutorID(id: string): void;
}) => {
  const drawInterlocutors = () => {
    return props.interlocutorIDs.map((id) => (
      <InterlocutorListUser
        key={id}
        id={id}
        setCurrentInterlocutorID={props.setCurrentInterlocutorID}
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
