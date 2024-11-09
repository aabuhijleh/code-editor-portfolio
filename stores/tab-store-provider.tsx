"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type TabStore, createTabStore } from "~/stores/tab-store";

export type TabStoreApi = ReturnType<typeof createTabStore>;

export const TabStoreContext = createContext<TabStoreApi | undefined>(
  undefined,
);

export interface TabStoreProviderProps {
  children: ReactNode;
}

export const TabStoreProvider = ({ children }: TabStoreProviderProps) => {
  const storeRef = useRef<TabStoreApi>(undefined);
  if (!storeRef.current) {
    storeRef.current = createTabStore();
  }

  return (
    <TabStoreContext.Provider value={storeRef.current}>
      {children}
    </TabStoreContext.Provider>
  );
};

export const useTabStore = <T,>(
  selector: (store: TabStore) => T,
): T | undefined => {
  const tabStoreContext = useContext(TabStoreContext);

  if (!tabStoreContext) {
    throw new Error(`useTabStore must be used within TabStoreProvider`);
  }

  return useStore(tabStoreContext, selector);
};
