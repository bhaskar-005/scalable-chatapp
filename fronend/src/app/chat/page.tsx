'use client'
import AlluserSidebar from "@/_components/AlluserSidebar";
import ChatWindow from "@/_components/ChatWindow";
import { useAuthStore } from "@/Zustand/useAuthStore";
import { useSelectedUser } from "@/Zustand/useSelectedUser";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [Text, setText] = useState<string>('');
  const [Texts, setTexts] = useState<Array<{ text: string, sender: string, recever: string, sentByCurrentUser: boolean }>>([]);
  const { authName } = useAuthStore();
  const { recever } = useSelectedUser();
  
  useEffect(() => {
    const soc = io("http://localhost:3020", {
      query: {
        userName: authName
      }
    });
    setSocket(soc);

    // Continue listening
    soc.on('chat', (m) => {
      console.log('new msg: ', m);
      setTexts((Texts) => [...Texts, { ...m, sentByCurrentUser: m.sender === authName }]);
    });

    return () => {
      soc.close();
    };
  }, [authName]);

  const handleFormSubmit = () => {
    if (!Text) {
      return;
    }
    if (socket && recever) {
      const Content = {
        sender: authName,
        recever: recever.username,
        text: Text
      };
      socket.emit('chat', Content);
      setTexts((Texts) => [...Texts, { ...Content, sentByCurrentUser: true }]);
      setText('');
      console.log(Texts);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      <AlluserSidebar />
      <ChatWindow
        chats={Texts.filter((c) =>
          (c.sender === authName && c.recever === recever.username) ||
          (c.sender === recever.username && c.recever === authName)
        )}
        submitMessage={handleFormSubmit}
        setText={setText}
        inputMsgvalue={Text}
      />
      <div className="absolute top-2 right-2 bg-gray-800 text-white px-6 py-2 rounded-full">{authName}</div>
    </div>
  );
}
