"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { useTabRouting } from "~/hooks/use-tab-routing";
import { cn } from "~/lib/utils";
import { Tab } from "~/stores/tab-store";
import { useTabStore } from "~/stores/tab-store-provider";

function TabItem({
  tab,
  activeTab,
  removeTab,
  setActiveTab,
  isDragging,
}: {
  tab: Tab;
  activeTab: Tab | null;
  removeTab?: (tab: Tab) => void;
  setActiveTab?: (tab: Tab) => void;
  isDragging: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({
      id: tab.href,
    });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const isActive = active?.id === tab.href;

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      role="tab"
      tabIndex={0}
      aria-selected={tab.href === activeTab?.href}
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        "transition-colors duration-200",
        "draggable select-none",
        tab.href === activeTab?.href && [
          "bg-blue-50 dark:bg-blue-900/20",
          "text-blue-600 dark:text-blue-400",
          "border-b-2 border-blue-500",
        ],
        isDragging && !isActive && "hover:bg-inherit dark:hover:bg-inherit",
        isActive && "z-20",
      )}
      onMouseUp={(e) => {
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
    </li>
  );
}

export function EditorHeader() {
  const store = useTabStore((state) => state);
  const { tabs, activeTab, removeTab, setActiveTab, reorderTabs } = store ?? {};
  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor),
  );

  const modifiers = [restrictToParentElement];

  useTabRouting();

  if (!tabs?.length) return null;

  function handleDragStart(event: DragStartEvent) {
    setIsDragging(true);
    if (tabs && setActiveTab) {
      const foundTab = tabs.find((tab) => tab.href === event.active.id);
      if (foundTab) {
        setActiveTab(foundTab);
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setIsDragging(false);
    const { active, over } = event;

    if (over && active.id !== over.id && tabs) {
      const oldIndex = tabs.findIndex((tab) => tab.href === active.id);
      const newIndex = tabs.findIndex((tab) => tab.href === over.id);
      reorderTabs?.(oldIndex, newIndex);
    }
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 overflow-x-auto border-b px-4">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={modifiers}
        collisionDetection={closestCenter}
      >
        <SortableContext
          items={tabs.map((tab) => tab.href)}
          strategy={horizontalListSortingStrategy}
        >
          <ul className="flex gap-2">
            {tabs?.map((tab) => (
              <TabItem
                key={tab.href}
                tab={tab}
                activeTab={activeTab ?? null}
                removeTab={removeTab}
                setActiveTab={setActiveTab}
                isDragging={isDragging}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </header>
  );
}
