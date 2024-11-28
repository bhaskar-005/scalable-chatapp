import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelectedUser } from '@/Zustand/useSelectedUser';
import { useAuthStore } from '@/Zustand/useAuthStore';

const AlluserSidebar = () => {
    const [users, setUsers] = useState([]);
    const {updateRecever,recever} = useSelectedUser();
    const {authName} = useAuthStore();
    console.log(recever);
    
  async function getUsers() {
    try {
     const res = await axios.get('http://localhost:8888/api/users');
     setUsers(res.data.filter((u:any)=>u.username !== authName));
     console.log(res.data);
     
    } catch (error) {
      console.log(error);
      toast.error('error while getting users.');
    }
  }

  useEffect(()=>{
    getUsers();
  },[])
  return (
    <div className="w-1/4 bg-white border-r">
        <div className="p-4 border-b">
          <Input type="text" placeholder="Search or start new chat" className="w-full" />
        </div>
        {
          users.length == 0 ? (
            <div>
              {[0,1,2,3,4,5].map((conversation:any) => (
            <div
              key={conversation}
             className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 border-b-[0.3px] border-b-gray-200 border-dashed animate-out `} //${activeConversation?.id === conversation.id ? 'bg-gray-100' : 
              >
               <div className='h-12 w-12 bg-gray-200 rounded-full animate-pulse'></div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="h-5 bg-gray-200 animate-pulse w-[50%] rounded-lg"></h3>
                </div>
                <p className="h-3 mt-1 bg-gray-200 animate-pulse w-[40%] rounded-lg truncate"></p>
              </div>
            </div>
          ))}
            </div>
          ):(
            <ScrollArea className="h-[calc(100vh-73px)]">
          {users.map((conversation:any) => (
            <div
              key={conversation._id}
             className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 border-b-[0.3px] border-b-gray-200 border-dashed animate-in ${recever.username === conversation.username ? 'bg-gray-100' : ''}`} //${activeConversation?.id === conversation.id ? 'bg-gray-100' : 
              onClick={() => updateRecever(conversation)}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={conversation.avatar} alt={conversation.username} />
                <AvatarFallback className='bg-sky-500 text-white'>{conversation.username[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">{conversation.username}</h3>
                  {/* <span className="text-sm text-gray-500">{conversation.createdAt}</span> */}
                </div>
                <p className="text-sm text-gray-500 truncate">Joind - {new Date(conversation.createdAt).toDateString()}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
          )
        }
      </div>
  );
}

export default AlluserSidebar;
