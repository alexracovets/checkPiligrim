import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useFormActive = create(immer((set) => ({
    isActive: false,
    formFrom: '',
    setIsActive: (value) => set((state) => {
        state.isActive = value;
    }),
    setFormFrome: (value) => set((state) => {
        state.formFrom = value;
    })
})));

export default useFormActive;