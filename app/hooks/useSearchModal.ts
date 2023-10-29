import { create } from "zustand";
interface SearchModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useSearchModal = create<SearchModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
