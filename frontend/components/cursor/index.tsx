"use client";

import { useStore } from "@/lib/state";
import { useEffect, useState } from "react";

export default function Cursor() {
  const { pointer, pointerClick, clearClick } = useStore();

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    if (window) {
      const { innerWidth: width, innerHeight: height } = window;

      setX(width * pointer.x);
      setY(height * pointer.y);
    }
  }, [pointer]);

  useEffect(() => {
    if (pointerClick) {
      // ...
      console.log("pointer click");

      clearClick();
    }
  }, [pointerClick]);

  return (
    <div
      className="pointer-events-none absolute z-[999] h-4 w-4 rounded-full border-4 bg-white bg-white/50"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* <div></div> */}
    </div>
  );
}
