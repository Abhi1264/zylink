"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { deleteLink, updateLink } from "@/app/actions/links";
import { useState } from "react";
import { GripVertical, Trash2, Eye, EyeOff } from "lucide-react";

interface SortableLinkProps {
  link: Link;
}

export function SortableLink({ link }: SortableLinkProps) {
  const [isEnabled, setIsEnabled] = useState(link.isEnabled);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleToggle = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    await updateLink(link.id, { isEnabled: newState });
  };

  const handleDelete = async () => {
    if (confirm("Delete this link? This action cannot be undone.")) {
      await deleteLink(link.id);
    }
  };

  const hostname = (() => {
    try {
      return new URL(link.url).hostname.replace("www.", "");
    } catch {
      return link.url;
    }
  })();

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`group border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover-lift-subtle border-focus transition-all ${
        !isEnabled ? "opacity-50" : ""
      }`}
    >
      <div className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
        {/* Drag Handle */}
        <button
          className="cursor-grab active:cursor-grabbing touch-none p-1.5 sm:p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
          {...attributes}
          {...listeners}
        >
          <GripVertical
            size={16}
            className="text-neutral-400"
            strokeWidth={1.5}
          />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-0.5 truncate tracking-precise">
            {link.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span className="mono-meta truncate max-w-[100px] sm:max-w-[200px]">{hostname}</span>
            <span className="hidden xs:inline">·</span>
            <span className="mono-meta whitespace-nowrap">{link.clicks}</span>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          <div
            className={`hidden sm:block px-2 py-1 rounded-md text-xs font-medium ${
              isEnabled
                ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            }`}
          >
            {isEnabled ? "Live" : "Hidden"}
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleToggle}
            className="h-8 w-8 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            title={isEnabled ? "Hide link" : "Show link"}
          >
            {isEnabled ? (
              <Eye size={16} strokeWidth={1.5} className="text-green-600" />
            ) : (
              <EyeOff size={16} strokeWidth={1.5} className="text-neutral-400" />
            )}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
            title="Delete link"
          >
            <Trash2 size={16} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
