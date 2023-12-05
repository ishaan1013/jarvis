"use client";

import { useState } from "react";
import * as voice from "./jarvis";
import { Volume2 } from "lucide-react";

export default function Intro() {
  const [playing, setPlaying] = useState(false);

  return (
    <button
      disabled={playing}
      onClick={() => {
        voice.introduction.play();
        setPlaying(true);
        voice.introduction.onended = () => setPlaying(false);
      }}
      className={`rounded-full border border-muted-foreground px-4 py-1 duration-200 ${
        playing
          ? "pointer-events-none opacity-50"
          : "hover:border-secondary-foreground hover:text-secondary-foreground"
      }`}
    >
      <Volume2 className="h-4 w-4" />
    </button>
  );
}
