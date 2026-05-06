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
    <div className={cn("flex", isFriend ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ring-1 ring-foreground/10 md:max-w-[70%]",
          isFriend
            ? "bg-muted text-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        <p className="whitespace-pre-wrap break-words leading-relaxed">
          {text}
        </p>
        <p
          className={cn(
            "mt-1 truncate text-[11px]",
            isFriend ? "text-muted-foreground" : "text-primary-foreground/80"
          )}
        >
          {isFriend ? (
            <Suspense fallback="cargando email...">
              <FriendEmail friendUID={senderId} />
            </Suspense>
          ) : (
            user?.email
          )}
        </p>
      </div>
    </div>
  );
};
export default MessageChat;