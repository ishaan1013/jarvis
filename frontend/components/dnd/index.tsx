"use client";

import { DndContext } from "@dnd-kit/core";
import { Drag } from "./drag";
import { Dispatch, SetStateAction, useState } from "react";
import { Move } from "lucide-react";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

export default function Dnd({
  x,
  y,
  setCoordinates,
}: {
  x: number;
  y: number;
  setCoordinates: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >;
}) {
  return (
    <>
      <button
        onClick={() => {
          setCoordinates(({ x, y }) => {
            return {
              x: x + 10,
              y: y + 10,
            };
          });
        }}
      >
        test
      </button>
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
          <Move className="h-4 w-4" />
        </Drag>
      </DndContext>
    </>
  );
}
