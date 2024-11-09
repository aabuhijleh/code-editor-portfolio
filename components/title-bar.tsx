import { SquareChevronRight, Settings } from "lucide-react";

import { Button } from "~/components/ui/button";
import { SidebarTrigger } from "~/components/ui/sidebar";

export function TitleBar() {
  return (
    <header className="fixed z-50 flex h-[var(--header-height)] w-full items-center justify-between border-b px-1">
      <div />
      <div>
        <Button
          variant="ghost"
          className="h-6 rounded-lg border bg-slate-800/50 px-32 py-0 text-sm text-muted-foreground hover:text-muted-foreground lg:px-64"
          title="Open command palette"
        >
          <SquareChevronRight /> abed-portfolio
        </Button>
      </div>
      <div className="flex gap-2">
        <div>
          <SidebarTrigger title="Toggle sidebar" />
          <span className="sr-only">Toggle sidebar</span>
        </div>
        <div>
          <Button
            variant="ghost"
            size="icon"
            title="Settings"
            className="h-7 w-7"
          >
            <Settings />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
