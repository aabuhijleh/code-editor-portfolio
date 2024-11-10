import { ScrollArea } from "@radix-ui/react-scroll-area";

import { AppSidebar } from "./app-sidebar";
import { EditorHeader } from "./editor-header";
import { SidebarInset } from "./ui/sidebar";

type EditorWrapperProps = {
  children: React.ReactNode;
};

export function EditorWrapper({ children }: EditorWrapperProps) {
  return (
    <>
      <AppSidebar className="top-[var(--header-height)]" />
      <SidebarInset className="top-[var(--header-height)] h-[calc(100svh-var(--header-height))] min-h-[calc(100svh-var(--header-height))]">
        <EditorHeader />
        <ScrollArea className="p-8">{children}</ScrollArea>
      </SidebarInset>
    </>
  );
}
