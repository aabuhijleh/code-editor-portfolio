"use client";

import { SquareChevronRight, Settings } from "lucide-react";

import { Button } from "~/components/ui/button";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";
import { useCommandStore } from "~/stores/command-store-provider";

function CommandPaletteButton() {
  const setOpen = useCommandStore((state) => state.setOpen);
  return (
    <Button
      variant="ghost"
      className={cn(
        "h-6 rounded-lg border",
        "bg-slate-200/50 hover:bg-slate-300/50 dark:bg-slate-800/50 dark:hover:bg-slate-700/50",
        "px-32 py-0 lg:px-48",
        "text-sm text-muted-foreground hover:text-muted-foreground",
      )}
      title="Open command palette"
      aria-label="Open command palette"
      onClick={() => setOpen?.(true)}
    >
      <SquareChevronRight className="mr-2" />
      <span>abed-portfolio</span>
    </Button>
  );
}

function SettingsButton() {
  const openSettings = useCommandStore((state) => state.openSettings);

  return (
    <Button
      variant="ghost"
      size="icon"
      title="Open settings"
      aria-label="Open settings"
      className="h-7 w-7"
      onClick={() => openSettings?.()}
    >
      <Settings />
    </Button>
  );
}

export function TitleBar() {
  return (
    <header className="fixed z-50 w-full border-b bg-background">
      <nav className="flex h-[var(--header-height)] items-center justify-between px-1">
        <div /> {/* Spacer */}
        <div>
          <CommandPaletteButton />
        </div>
        <div className="flex items-center gap-2">
          <SidebarTrigger aria-label="Toggle sidebar" title="Toggle sidebar" />
          <SettingsButton />
        </div>
      </nav>
    </header>
  );
}
