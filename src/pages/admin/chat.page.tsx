import MessagesChat from "@/components/chat/messages-chat";
import { Suspense, useState } from "react";
import FormMessageChat from "@/components/chat/form-message-chat";
import ListRoomChat from "@/components/chat/list-room-chat";
import FormSearchFriend from "@/components/chat/form-search-friend";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");

  const handleSelectedRoomId = (roomId: string) => {
    setRoomId(roomId);
  };

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[380px_1fr]">
        <Card className="min-h-[calc(100vh-8rem)]">
          <CardHeader className="border-b">
            <CardTitle>Chats</CardTitle>
            <CardDescription>
              Busca por email y selecciona una conversación.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex min-h-0 flex-1 flex-col gap-3">
            <Suspense fallback={<div className="text-sm text-muted-foreground">Cargando...</div>}>
              <FormSearchFriend handleClickRoomId={handleSelectedRoomId} />
              <Separator />
              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                <ListRoomChat
                  handleSelectedRoomId={handleSelectedRoomId}
                  selectedRoomId={roomId}
                />
              </div>
            </Suspense>
          </CardContent>
        </Card>

        <Card className="min-h-[calc(100vh-8rem)]">
          {roomId ? (
            <Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Cargando mensajes...</div>}>
              <CardHeader className="border-b">
                <CardTitle className="truncate">Sala</CardTitle>
                <CardDescription className="truncate">{roomId}</CardDescription>
              </CardHeader>

              <div className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
                  <MessagesChat roomId={roomId} />
                </div>
                <div className="border-t bg-muted/30 px-4 py-3">
                  <FormMessageChat roomId={roomId} />
                </div>
              </div>
            </Suspense>
          ) : (
            <>
              <CardHeader className="border-b">
                <CardTitle>Chat</CardTitle>
                <CardDescription>Selecciona una sala para empezar.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 items-center justify-center py-16">
                <div className="text-center text-sm text-muted-foreground">
                  Sin sala seleccionada
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};
export default ChatPage;