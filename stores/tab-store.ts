import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Tab = { name: string; href: string };

export type TabState = { tabs: Tab[]; activeTab: Tab | null };

export type TabActions = {
  addTab: (tab: Tab) => void;
  removeTab: (tab: Tab) => void;
};

export type TabStore = TabState & TabActions;

export const defaultInitialState: TabState = { tabs: [], activeTab: null };

export const createTabStore = (initialState: TabState = defaultInitialState) =>
  create<TabStore>()(
    persist(
      (set, get) => ({
        ...initialState,
        addTab: (tab) => {
          const tabs = get().tabs;
          const tabExists = tabs.some((t) => t.href === tab.href);
          return set({
            tabs: tabExists ? tabs : [...tabs, tab],
            activeTab: tab,
          });
        },
        removeTab: (tab) =>
          set({
            tabs: get().tabs.filter((t) => t.href !== tab.href),
            activeTab:
              get().activeTab?.href === tab.href
                ? get().tabs[get().tabs.indexOf(tab) - 1] ||
                  get().tabs[get().tabs.indexOf(tab) + 1] ||
                  null
                : get().activeTab,
          }),
      }),
      {
        name: "tab-store",
      },
    ),
  );
