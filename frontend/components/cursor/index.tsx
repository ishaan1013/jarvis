"use client";

import { useStore } from "@/lib/state";

export default function Cursor() {
  const { pointer } = useStore();

  const { innerWidth: width, innerHeight: height } = window;

  return (
    <div
      className="pointer-events-none absolute z-[999] h-4 w-4 rounded-full border-4 bg-white bg-white/50"
      style={{
        left: pointer.x * width,
        top: pointer.y * height,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div></div>
    </div>
  );
}
