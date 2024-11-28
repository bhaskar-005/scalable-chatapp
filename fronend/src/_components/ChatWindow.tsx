import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/Zustand/useAuthStore';
import { useSelectedUser } from '@/Zustand/useSelectedUser';
import React from 'react';

const ChatWindow = ({chats, submitMessage, setText, inputMsgvalue}:any) => {
  const {recever} = useSelectedUser();
  const {authName} = useAuthStore();
  return (
    <div className="flex-1 flex flex-col">
    {recever.username ? (
      <>
        <div className="bg-white p-4 flex items-center justify-between border-b">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              {/* <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} /> */}
              <AvatarFallback className='bg-sky-500 text-white' >{recever.username[0]}</AvatarFallback>
            </Avatar>
            <h2 className="ml-4 font-medium text-gray-700">{recever.username}</h2>
          </div>
          {/* <div className="flex space-x-2"> */}
            {/* <Button variant="ghost" size="icon"> */}
              {/* <Phone className="h-5 w-5" /> */}
            {/* </Button> */}
            {/* <Button variant="ghost" size="icon"> */}
              {/* <Video className="h-5 w-5" /> */}
            {/* </Button> */}
            {/* <Button variant="ghost" size="icon"> */}
              {/* <Search className="h-5 w-5" /> */}
            {/* </Button> */}
            {/* <Button variant="ghost" size="icon"> */}
              {/* <MoreVertical className="h-5 w-5" /> */}
            {/* </Button> */}
          {/* </div> */}
        </div>
        <ScrollArea className="flex-1 p-4 bg-gray-100">
          {chats.map((message:any) => (
            <div
              key={message.text}
              className={`mb-4 ${ message.sentByCurrentUser ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.sentByCurrentUser ? 'bg-blue-500 text-white' : 'bg-white'
                }`}
              >
                {message.text}
                {/* <div className="text-xs mt-1 opacity-70">{message.time}</div> */}
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="bg-white p-4 flex items-center">
          <Textarea
            // type="text"
            placeholder="Type a message"
            value={inputMsgvalue}
            rows={2}
            cols={2}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 mr-4 text-base ring-sky-700"
          />
          <Button 
          className='bg-sky-600'
          onClick={submitMessage}
          type="submit">
            {/* <Send className="h-5 w-5" /> */}
            <span>Send</span>
          </Button>
        </div>
      </>
    ) : (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className=''>
        <h2 className="mb-4 text-center text-2xl font-medium text-gray-600">👋 hi, {authName}</h2>
        <p className="text-gray-400">Select a conversation to start chatting</p>
        </div>
      </div>
    )}
  </div>
  );
}

export default ChatWindow;
