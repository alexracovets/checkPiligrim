import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useLoader = create(immer((set) => ({
    isLoaderActive: true,
    setIsLoaderActive: (value) => set((state) => {
        state.isLoaderActive = value;
    })
})));

export default useLoader;