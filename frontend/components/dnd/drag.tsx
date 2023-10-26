import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function Drag({
  children,
  y,
  x,
}: {
  children: React.ReactNode;
  y: number;
  x: number;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      className="absolute z-10 flex h-24 w-36 items-center justify-center rounded-md bg-white text-black"
      ref={setNodeRef}
      style={{ ...style, top: y, left: x }}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
}
