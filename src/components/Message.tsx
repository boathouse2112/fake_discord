type TextContentData = {
  type: 'text';
  text: string;
};

// Tagged union, can switch on `type` field.
type MessageContentData = TextContentData;

type MessageData = {
  time: string;
  content: MessageContentData;
};

// Display a message - it's time and contents
// When I have more contents types, this will insert the correct type.
const Message = (props: MessageData) => {
  const drawContent = () => {
    switch (props.content.type) {
      case 'text':
        return <p>{props.content.text}</p>;
    }
  };

  return <div>{drawContent()}</div>;
};

export type { MessageData };

export default Message;
