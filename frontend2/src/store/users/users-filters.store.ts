import { create } from "zustand";

interface IUsersFiltersStore {
    length: number;
    start: number;
    order: number;
    draw: number;
    column: string;
    sort: string;
    search: string;

    setDraw: () => void;
    setLength: (length: number) => void;
    setStart: (start: number) => void;
    setOrder: (order: number) => void;
    setColumn: (index: number, column: string, sort: string) => void;
    setSort: (sort: string) => void;
    setSearch: (search: string) => void;
}

export const useUserFiltersStore = create<IUsersFiltersStore>()((set) => ({
    draw: 1,
    length: 10,
    start: 0,
    order: 0,
    column: "id",
    sort: "asc",
    search: "",

    // setDraw: () => set((state) => ({ draw: state.draw + 1 })),
    setDraw: () => {
        // get((state) => console.log(state.draw))
        set((state) => ({ draw: state.draw + 1 }));
    },
    setSearch: (searchText) =>
        set(() => ({
            search: searchText,
        })),
    setLength: (length) => set(() => ({ length })),
    setStart: (start) => set({ start }),
    setOrder: (order) => set({ order }),
    setColumn: (index, column, sort) =>
        set({
            column: column,
            sort: sort,
            order: index,
        }),
    setSort: (sort) => set({ sort }),
}));
