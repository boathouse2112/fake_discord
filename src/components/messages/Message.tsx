import { Dayjs } from 'dayjs';
import { MessageContent } from '../../types';

type MessageProps = {
  time: Dayjs;
  content: MessageContent;
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
