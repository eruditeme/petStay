import { create } from 'zustand';

interface ReservationSpecifyModalStore {
    isOpen:boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useReservationSpecify = create<ReservationSpecifyModalStore>((set) => ({
    isOpen:false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useReservationSpecify;