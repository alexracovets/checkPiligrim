import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useHeader = create(immer((set) => ({
    activeLink: 'mainLink',
    setActiveLink: (value) => set((state) => {
        state.activeLink = value;
    })
})));

export default useHeader;