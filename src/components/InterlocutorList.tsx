import InterlocutorListUser from './InterlocutorListUser';

const InterlocutorList = (props: { interlocutorIDs: string[] }) => {
  const drawInterlocutors = () => {
    return props.interlocutorIDs.map((id) => (
      <InterlocutorListUser key={id} id={id} />
    ));
  };

  return (
    <div className="flex-shrink-0 w-52 p-4 flex flex-col gap-2 bg-neutral-700">
      {drawInterlocutors()}
    </div>
  );
};

export default InterlocutorList;
