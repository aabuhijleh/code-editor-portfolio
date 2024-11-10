"use client";

import { X } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useTabRouting } from "~/hooks/use-tab-routing";
import { cn } from "~/lib/utils";
import { useTabStore } from "~/stores/tab-store-provider";

export function EditorHeader() {
  const store = useTabStore((state) => state);
  const { tabs, activeTab, removeTab, setActiveTab } = store ?? {};

  useTabRouting();

  if (!tabs?.length) return null;

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 overflow-x-auto border-b px-4">
      {tabs?.map((tab) => (
        <div
          key={tab.name}
          role="tab"
          tabIndex={0}
          aria-selected={tab.href === activeTab?.href}
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            "transition-colors duration-200",
            "draggable select-none",
            tab.href === activeTab?.href && [
              "bg-blue-50 dark:bg-blue-900/20",
              "text-blue-600 dark:text-blue-400",
              "border-b-2 border-blue-500",
            ],
          )}
          onMouseUp={(e) => {
            // middle click to close tab
            if (e.button === 1) {
              e.preventDefault();
              removeTab?.(tab);
            }
          }}
          onClick={() => setActiveTab?.(tab)}
        >
          {tab.name}
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              removeTab?.(tab);
            }}
            aria-label={`Close ${tab.name} tab`}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </header>
  );
}
