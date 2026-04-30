import MessagesChat from "@/components/chat/messages-chat";
import RoomChat from "@/components/chat/list-room-chat";
import { Suspense, useState } from "react";
import FormMessageChat from "@/components/chat/form-message-chat";

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");

  const handleSelectedRoomId = (roomId: string) => {
    setRoomId(roomId);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Suspense fallback={<div>Cargando rooms...</div>}>
          <RoomChat handleSelectedRoomId={handleSelectedRoomId} />
        </Suspense>
        {roomId ? (
          <Suspense fallback={<div>Cargando mensajes...</div>}> 
            <FormMessageChat roomId={roomId}></FormMessageChat>
            {<MessagesChat roomId={roomId} />}       
          </Suspense>
        ) : (
          <div>Sin sala seleccionada</div>
        )}
      </div>
    </div>
  );
};
export default ChatPage;