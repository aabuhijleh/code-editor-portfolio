"use client";

import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Tab } from "~/stores/tab-store";
import { useTabStore } from "~/stores/tab-store-provider";

const PATHNAME_TO_TAB: Record<string, Tab> = {
  "/about": { name: "About.tsx", href: "/about" },
  "/experience": { name: "Experience.tsx", href: "/experience" },
  "/projects": { name: "Projects.tsx", href: "/projects" },
  "/contact": { name: "Contact.md", href: "/contact" },
  "/resume": { name: "Resume.pdf", href: "/resume" },
  "/profile": { name: "Profile.png", href: "/profile" },
};

export function EditorHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const tabs = useTabStore((state) => state.tabs);
  const activeTab = useTabStore((state) => state.activeTab);
  const addTab = useTabStore((state) => state.addTab);
  const removeTab = useTabStore((state) => state.removeTab);

  useEffect(() => {
    const tab = PATHNAME_TO_TAB[pathname];
    if (tab) {
      addTab?.(tab);
    }
  }, [pathname, addTab]);

  useEffect(() => {
    if (activeTab) {
      router.push(activeTab.href);
    } else {
      router.push("/");
    }
  }, [activeTab, router]);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      {tabs?.map((tab) => (
        <div
          key={tab.name}
          className={cn(
            "flex items-center gap-2",
            tab.href === activeTab?.href && "text-blue-500",
          )}
        >
          {tab.name}
          <Button variant="ghost" size="icon" onClick={() => removeTab?.(tab)}>
            <X />
          </Button>
        </div>
      ))}
    </header>
  );
}
