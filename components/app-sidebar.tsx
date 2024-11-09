"use client";

import { ChevronRight, File, Folder } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "~/components/ui/sidebar";
import { useTabStore } from "~/stores/tab-store-provider";

const tree = [
  [
    { name: "components" },
    { name: "About.tsx", href: "/about" },
    { name: "Experience.tsx", href: "/experience" },
    { name: "Projects.tsx", href: "/projects" },
  ],
  [{ name: "public" }, { name: "Profile.png", href: "/profile" }],
  { name: "Contact.md", href: "/contact" },
  { name: "Resume.pdf", href: "/resume" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Files</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tree.map((item, index) => (
                <Tree key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function Tree({ item }: { item: Record<string, string> | any[] }) {
  const pathname = usePathname();
  const [{ name, href }, ...items] = Array.isArray(item) ? item : [item];
  const addTab = useTabStore((state) => state.addTab);

  if (!items.length) {
    return (
      <Link href={href} onClick={() => addTab?.(name)}>
        <SidebarMenuButton
          isActive={pathname === href}
          className="data-[active=true]:bg-slate-600/50 data-[active=true]:focus:outline-blue-600"
        >
          <File />
          {name}
        </SidebarMenuButton>
      </Link>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={name === "components" || name === "public"}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Folder />
            {name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => (
              <Tree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
