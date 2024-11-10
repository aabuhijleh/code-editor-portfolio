"use client";

import {
  SiGithub as Github,
  SiStackoverflow as StackOverflow,
} from "@icons-pack/react-simple-icons";
import { Code, Settings, Moon, Sun, Monitor, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/ui/command";
import { useCommandStore } from "~/stores/command-store-provider";

export function CommandPalette() {
  const store = useCommandStore((state) => state);
  const { open, setOpen, search, setSearch, pages, setPages, openSettings } =
    store ?? {};
  const page = pages?.[pages.length - 1];
  const { setTheme } = useTheme();

  useHotkeys(["shift+ctrl+p", "shift+meta+p", "f1"], () => setOpen?.(true));
  useHotkeys(["ctrl+s", "meta+s"], () => openSettings?.(), {
    enableOnContentEditable: true,
    enableOnFormTags: true,
  });

  const handleCommandSelectAndClose = (callback: () => void) => () => {
    callback();
    setOpen?.(false);
  };

  return (
    <CommandDialog
      title="Command Palette"
      description="Type a command or search.."
      open={open}
      onOpenChange={setOpen}
      onEscapeKeyDown={(e) => {
        if (pages?.length) {
          e.preventDefault();
        }
      }}
      onCommandKeyDown={(e) => {
        if ((e.key === "Escape" || e.key === "Backspace") && !search) {
          e.preventDefault();
          setPages?.(pages?.slice(0, -1) || []);
        }
        if (e.key === "Escape" && search) {
          e.preventDefault();
          setSearch?.("");
        }
      }}
    >
      <CommandInput
        placeholder="Type a command or search..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {!page && (
          <>
            <CommandGroup heading="Suggestions">
              <CommandItem
                onSelect={handleCommandSelectAndClose(() =>
                  window.open("https://github.com/aabuhijleh"),
                )}
              >
                <Github />
                <span>Open Github Profile</span>
              </CommandItem>
              <CommandItem
                onSelect={handleCommandSelectAndClose(() =>
                  window.open(
                    "https://stackoverflow.com/users/9698583/aabuhijleh",
                  ),
                )}
              >
                <StackOverflow />
                <span>Open Stack Overflow Profile</span>
              </CommandItem>
              <CommandItem
                onSelect={handleCommandSelectAndClose(() =>
                  window.open(
                    "https://github.dev/aabuhijleh/code-editor-portfolio",
                  ),
                )}
              >
                <Code />
                <span>Open Source Code</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem
                onSelect={() => setPages?.([...(pages || []), "settings"])}
              >
                <Settings />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </>
        )}

        {page === "settings" && (
          <CommandGroup heading="Settings">
            <CommandItem
              onSelect={() => setPages?.([...(pages || []), "theme"])}
            >
              <Palette />
              <span>Theme</span>
              <CommandShortcut>⌘T</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        )}

        {page === "theme" && (
          <CommandGroup heading="Select Theme">
            <CommandItem
              onSelect={handleCommandSelectAndClose(() => setTheme("light"))}
            >
              <Sun />
              <span>Light</span>
            </CommandItem>
            <CommandItem
              onSelect={handleCommandSelectAndClose(() => setTheme("dark"))}
            >
              <Moon />
              <span>Dark</span>
            </CommandItem>
            <CommandItem
              onSelect={handleCommandSelectAndClose(() => setTheme("system"))}
            >
              <Monitor />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
