import { MessageContentData } from '../MessageTypes';

type MessageProps = {
  time: string;
  content: MessageContentData;
};

// Display a message - it's time and contents
// When I have more contents types, this will insert the correct type.
const Message = (props: MessageProps) => {
  const drawContent = () => {
    switch (props.content.type) {
      case 'text':
        return <p>{props.content.text}</p>;
    }
  };

  return <div>{drawContent()}</div>;
};

export type { MessageProps };

export default Message;
