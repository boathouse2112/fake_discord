import { MessageContent } from '../../types';

type MessageProps = {
  time: Date;
  content: MessageContent;
};

// Display a message - it's time and contents
// When I have more contents types, this will insert the correct type.
const Message = ({ time, content }: MessageProps) => {
  const drawContent = () => {
    switch (content.type) {
      case 'text':
        return <p>{content.text}</p>;
    }
  };

  return <div>{drawContent()}</div>;
};

export type { MessageProps };

export default Message;
