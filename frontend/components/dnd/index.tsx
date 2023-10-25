"use client";

import { DndContext } from "@dnd-kit/core";
import { Drag } from "./drag";
import { useState } from "react";
import { Move } from "lucide-react";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

export default function Dnd() {
  const [{ x, y }, setCoordinates] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  return (
    <DndContext
      modifiers={[restrictToWindowEdges]}
      onDragEnd={({ delta }) => {
        setCoordinates(({ x, y }) => {
          return {
            x: x + delta.x,
            y: y + delta.y,
          };
        });
      }}
    >
      <Drag y={y} x={x}>
        <Move className="w-4 h-4" />
      </Drag>
    </DndContext>
  );
}
