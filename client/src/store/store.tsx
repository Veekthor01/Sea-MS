import { create } from 'zustand';

// Define your store's state
interface StoreState {
  username: string;
  setUsername: (username: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  isNewUser: boolean;
  setIsNewUser: (isNewUser: boolean) => void;
}

// Use the state in create function
export const useStore = create<StoreState>(set => ({
  username: '',
  setUsername: (username: string) => set({ username }),
  firstName: '',
  setFirstName: (firstName: string) => set({ firstName }),
  isNewUser: false,
  setIsNewUser: (isNewUser: boolean) => set({ isNewUser }),
}));

export default useStore;