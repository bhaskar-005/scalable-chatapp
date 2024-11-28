import { create } from 'zustand'

type Store = {
    authName: string
    updateAuthName:Function
}

export const useAuthStore = create<Store>((set) => ({
    authName: '',
    updateAuthName: (name:string) => set({authName: name})
 }))
 