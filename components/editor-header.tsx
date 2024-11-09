"use client";

import { useTabStore } from "~/stores/tab-store-provider";

export function EditorHeader() {
  const tabs = useTabStore((state) => state.tabs);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      {tabs?.map((tab) => <div key={tab}>{tab}</div>)}
    </header>
  );
}
