import { Settings, SquareChevronRight } from "lucide-react";
import { type Metadata } from "next";
import React from "react";

import { AppSidebar } from "~/components/app-sidebar";
import { EditorHeader } from "~/components/editor-header";
import { ThemeProvider } from "~/components/theme-provider";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { TabStoreProvider } from "~/stores/tab-store-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abed Abu-Hijleh",
  description: "A code-editor themed portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="font-sans antialiased"
        style={
          {
            "--header-height": "36px",
          } as React.CSSProperties
        }
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TabStoreProvider>
            <SidebarProvider>
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
              <AppSidebar className="top-[var(--header-height)]" />
              <SidebarInset className="top-[var(--header-height)] h-[calc(100svh-var(--header-height))] min-h-[calc(100svh-var(--header-height))]">
                <EditorHeader />
                <ScrollArea>{children}</ScrollArea>
              </SidebarInset>
            </SidebarProvider>
          </TabStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
