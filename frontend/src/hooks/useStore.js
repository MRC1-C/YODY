import create from "zustand";

export const useStore = create((set) => ({
    arrItems: [],
    isLogin: false,
    setIsLogin: (value) => set(() => ({ isLogin: value })),
    addItems: (value) => set((state) => ({ arrItems: [...state.arrItems,value] })),
    removeItems: (value) => set((state) => ({ arrItems: state.arrItems.filter(e=>e!==value) })),
}));