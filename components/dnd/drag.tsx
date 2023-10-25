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
      className="bg-white text-black absolute flex items-center justify-center rounded-md h-24 w-36"
      ref={setNodeRef}
      style={{ ...style, top: y, left: x }}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
}
