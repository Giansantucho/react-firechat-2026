import type { Room } from "@/schemas/room.schema";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useRoomActions = () => {
  const db = useFirestore();
  const { data: user } = useUser();

  if (!user) throw new Error("Usuario no autorizado");

  const roomRef = collection(db, "rooms");

  const roomQuery = query(
    roomRef,
    where("participants", "array-contains", user.uid)
  );

  const { data: rooms } = useFirestoreCollectionData(roomQuery, {
    suspense: true,
    idField: "id",
  });

  // buscar un user a partir de un email
  const searchUserWithEmail = async (email: string) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];

    return doc.data();
  };

  const findOrCreateRoom = async(friendEmail: string) => {
    if(!user) return {
      success: false,
      message: "401. no autorizado",
      roomId: null
    }

    if(user.email === friendEmail) return{
      success: false,
      message: "400 no te busques",
      roomId: null
    }

    const friend = await searchUserWithEmail(friendEmail)

    if(!friend) return {
      success: false,
      message: "404 friend no encontrado",
      roomId: null  
    }

    const existRoom = rooms.find(room => (
      room.participants.find((uid: string) => uid === friend.uid)
    ))

    if(existRoom) return {
      success: true,
      message: "Sala encontrada",
      roomId: existRoom.id
    }

    const newRoom: Omit<Room, "id"> ={
      createdAt: serverTimestamp(),
      lastMessage: null,
      participants: [friend.uid, user.uid]
    }

    const documents = await addDoc(roomRef, newRoom)

    return {
      success: true,
      message: "200 Sala encontrada",
      roomId: documents.id
    }
  }

  return {
    rooms: rooms as Room[],
    searchUserWithEmail,
     findOrCreateRoom
  };
};