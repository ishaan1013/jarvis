"use client";

import { useStore } from "@/lib/state";

export default function Cursor() {
  const { pointer } = useStore();

  const { innerWidth: width, innerHeight: height } = window;

  return (
    <div
      className="pointer-events-none absolute z-[999] rounded-full bg-red-600 px-2 py-0.5"
      style={{
        left: (pointer.x / 100) * width,
        top: (pointer.y / 100) * height,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div>
        {(pointer.x / 100) * width}, {(pointer.y / 100) * height}
      </div>
    </div>
  );
}
