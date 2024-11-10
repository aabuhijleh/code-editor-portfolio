"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type CommandStore, createCommandStore } from "~/stores/command-store";

export type CommandStoreApi = ReturnType<typeof createCommandStore>;

export const CommandStoreContext = createContext<CommandStoreApi | undefined>(
  undefined,
);

export interface CommandStoreProviderProps {
  children: ReactNode;
}

export const CommandStoreProvider = ({
  children,
}: CommandStoreProviderProps) => {
  const storeRef = useRef<CommandStoreApi>(undefined);
  if (!storeRef.current) {
    storeRef.current = createCommandStore();
  }

  return (
    <CommandStoreContext.Provider value={storeRef.current}>
      {children}
    </CommandStoreContext.Provider>
  );
};

export const useCommandStore = <T,>(
  selector: (store: CommandStore) => T,
): T | undefined => {
  const commandStoreContext = useContext(CommandStoreContext);

  if (!commandStoreContext) {
    throw new Error(`useCommandStore must be used within CommandStoreProvider`);
  }

  return useStore(commandStoreContext, selector);
};
