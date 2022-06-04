import dayjs from "dayjs";
import { useUserName } from "../../hooks";
import { MessageData } from "../../types";
import Avatar from "../user/Avatar";
import Message from "./Message";
import UserCard from "../user/UserCard";

type MessageGroupProps = {
  id: string;
  authorId: string; // Author of the message
  time: dayjs.Dayjs; // Time the first message was sent
  messages: MessageData[]; // Messages in this group
};

const MessageGroup = (props: MessageGroupProps) => {
  const authorName = useUserName(props.authorId);

  const drawMessages = () => {
    return props.messages.map((message) => (
      <Message key={message.id} {...message} />
    ));
  };

  return (
    <div className="p-6 flex flex-row gap-2">
      <Avatar userId={props.authorId} />
      <div className="flex flex-col text-white">
        <div className="flex flex-row gap-2">
          {authorName === undefined ? undefined : (
            <UserCard userId={props.authorId} userName={authorName} />
          )}
          <h2>{props.time.fromNow()}</h2>
        </div>
        {drawMessages()}
      </div>
    </div>
  );
};

export type { MessageGroupProps };

export default MessageGroup;
