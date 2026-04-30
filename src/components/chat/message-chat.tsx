import { cn } from "@/lib/utils";
import type { Message } from "@/schemas/room.schema";
import { Suspense } from "react";
import { useUser } from "reactfire";
import FriendEmail from "./friend-email";

interface Props {
  message: Message;
}

const MessageChat = ({ message }: Props) => {
  const { senderId, text } = message;

  const { data: user } = useUser();

  const isFriend = user?.uid !== senderId;

  return (
    <div
      className={cn(
        "max-w-50 p-2",
        isFriend ? "bg-pink-100" : "bg-green-100 ml-auto"
      )}
    >
      <p>{text}</p>
      <p className="truncate text-xs">
        {isFriend ? (
          <Suspense fallback="cargando email...">
            <FriendEmail  friendUID={senderId} />
          </Suspense>
        ) : (
          user.email
        )}
      </p>
    </div>
  );
};
export default MessageChat;