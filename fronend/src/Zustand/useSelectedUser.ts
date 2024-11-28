import { create } from 'zustand'

type recever = {
    username:string;
    createdAt?:string;
    updatedAt?:string;
    _id?:string;
}

type Store = {
    recever:recever
    updateRecever:Function
}

export const useSelectedUser = create<Store>((set) => ({
    recever: {
        username:'',
        createdAt:'',
        updatedAt:''
    },
    updateRecever: (rec:recever) => set({recever:rec})
 }))
 