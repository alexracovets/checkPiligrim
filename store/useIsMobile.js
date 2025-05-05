import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useMainSlider = create(immer((set) => ({
    isMobile: false,
    viewSize: 0,
    setIsMobile: (value) => set((state) => {
        state.isMobile = value
    }),
    setViewSize: (value) => set((state) => {
        state.viewSize = value
    })
})));

export default useMainSlider;
