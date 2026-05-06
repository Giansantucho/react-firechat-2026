import { useRoomActions } from "@/hooks/use-room-actions";
import RoomChat from "./room-chat";

interface Props {
  handleSelectedRoomId: (roomId: string) => void;
  selectedRoomId?: string;
}

const ListRoomChat = ({ handleSelectedRoomId, selectedRoomId }: Props) => {
  const { rooms } = useRoomActions();

  return (
    <div className="space-y-1">
      {rooms.map((room) => (
        <RoomChat
          key={room.id}
          room={room}
          handleClickRoomId={handleSelectedRoomId}
          isActive={selectedRoomId === room.id}
        />
      ))}
      {/*<pre>{JSON.stringify(rooms, null, 2)}</pre>*/}
    </div>
  );
};
export default ListRoomChat;