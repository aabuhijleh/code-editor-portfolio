import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Tab = string;

export type TabState = { tabs: Tab[] };

export type TabActions = {
  addTab: (tab: Tab) => void;
  removeTab: (tab: Tab) => void;
};

export type TabStore = TabState & TabActions;

export const defaultInitialState: TabState = { tabs: [] };

export const createTabStore = (initialState: TabState = defaultInitialState) =>
  create<TabStore>()(
    persist(
      (set, get) => ({
        ...initialState,
        addTab: (tab) => {
          const tabs = get().tabs;
          return set({
            tabs: tabs.includes(tab) ? tabs : [...tabs, tab],
          });
        },
        removeTab: (tab) => set({ tabs: get().tabs.filter((t) => t !== tab) }),
      }),
      {
        name: "tab-store",
      },
    ),
  );
