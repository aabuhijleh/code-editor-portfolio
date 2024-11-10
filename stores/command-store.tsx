import { create } from "zustand";

export type CommandState = {
  open: boolean;
  search: string;
  pages: string[];
};

export type CommandActions = {
  setOpen: (open: boolean) => void;
  setSearch: (search: string) => void;
  setPages: (pages: string[]) => void;
  openSettings: () => void;
};

export type CommandStore = CommandState & CommandActions;

export const defaultInitialState: CommandState = {
  open: false,
  search: "",
  pages: [],
};

export const createCommandStore = (
  initialState: CommandState = defaultInitialState,
) =>
  create<CommandStore>()((set, get) => ({
    ...initialState,
    setOpen: (open) =>
      set({
        open,
        pages: open ? [] : get().pages,
        search: open ? "" : get().search,
      }),
    setSearch: (search) => set({ search }),
    setPages: (pages) => set({ pages }),
    openSettings: () => set({ open: true, pages: ["settings"], search: "" }),
  }));
