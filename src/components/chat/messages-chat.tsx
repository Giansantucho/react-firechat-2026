import { useMessageActions } from "@/hooks/use-messages-actions";
import MessageChat from "./message-chat";

interface Props {
  roomId: string;
}

const MessagesChat = ({ roomId }: Props) => {
  const { messages } = useMessageActions(roomId);

  return (
    <div className="space-y-2">
      {/* <pre>{JSON.stringify(messages, null, 2)}</pre> */}
      {messages.map((message) => (
        <MessageChat
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
};
export default MessagesChat;