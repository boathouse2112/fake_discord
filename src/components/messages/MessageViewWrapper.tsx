/**
 * Displays just the background until all props are real values.
 * Avoids calling hooks conditionally if the props aren't ready.
 */
import MessageView, {
  MessageViewProps,
  MessageViewPropsSchema,
} from "./MessageView";

const MessageViewWrapper = (props: Partial<MessageViewProps>) => {
  const allProps = MessageViewPropsSchema.safeParse(props);

  return (
    <div className="w-full h-full bg-neutral-600 flex flex-col">
      {allProps.success ? <MessageView {...allProps.data} /> : undefined}
    </div>
  );
};

export default MessageViewWrapper;
