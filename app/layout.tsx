import { type Metadata } from "next";
import React from "react";

import { EditorWrapper } from "~/components/editor-wrapper";
import { ThemeProvider } from "~/components/theme-provider";
import { TitleBar } from "~/components/title-bar";
import { SidebarProvider } from "~/components/ui/sidebar";
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
              <TitleBar />
              <EditorWrapper>{children}</EditorWrapper>
            </SidebarProvider>
          </TabStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
