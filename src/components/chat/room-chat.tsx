import type { Room } from "@/schemas/room.schema"
import { useUser } from "reactfire"
import { Button } from "../ui/button"
import FriendEmail from "./friend-email"
import { Suspense } from "react"
import { cn } from "@/lib/utils"

interface Props{
  room: Room,
  handleClickRoomId: (id: string) => void
  isActive?: boolean
}

const RoomChat = ({room, handleClickRoomId, isActive}: Props) => {

  const {data: user} = useUser()

  const friendUID = room.participants.find((id) => id !== user?.uid) || ""

  return (
    <Button
      variant="ghost"
      onClick={() => handleClickRoomId(room.id)}
      className={cn(
        "h-auto w-full justify-start rounded-lg px-3 py-2 text-left",
        isActive && "bg-muted"
      )}
    >
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="truncate font-medium">
          <Suspense fallback="cargando info friend...">
            <FriendEmail friendUID={friendUID} />
          </Suspense>
        </div>
        <div className="truncate text-xs text-muted-foreground">
          {room.id}
        </div>
      </div>
    </Button>
  )
}

export default RoomChat