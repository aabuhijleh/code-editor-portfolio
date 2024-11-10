import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Tab = { name: string; href: string };

export type TabState = {
  tabs: Tab[];
  activeTab: Tab | null;
};

export type TabActions = {
  addTab: (tab: Tab) => void;
  removeTab: (tab: Tab) => void;
  setActiveTab: (tab: Tab) => void;
};

export type TabStore = TabState & TabActions;

export const defaultInitialState: TabState = { tabs: [], activeTab: null };

export const createTabStore = (initialState: TabState = defaultInitialState) =>
  create<TabStore>()(
    persist(
      (set, get) => ({
        ...initialState,

        addTab: (tab) => {
          const { tabs } = get();
          const tabExists = tabs.some((t) => t.href === tab.href);

          // Only add the tab if it doesn't exist, always set it as active
          return set({
            tabs: tabExists ? tabs : [...tabs, tab],
            activeTab: tab,
          });
        },

        removeTab: (tab) => {
          const { tabs, activeTab } = get();
          const currentIndex = tabs.indexOf(tab);

          // When removing the active tab, try to activate the next tab,
          // if not available, try the previous tab, if none exist, set to null
          const newActiveTab =
            activeTab?.href === tab.href
              ? tabs[currentIndex + 1] || tabs[currentIndex - 1] || null
              : activeTab;

          set({
            tabs: tabs.filter((t) => t.href !== tab.href),
            activeTab: newActiveTab,
          });
        },

        setActiveTab: (tab) => set({ activeTab: tab }),
      }),
      {
        name: "tab-store",
      },
    ),
  );
