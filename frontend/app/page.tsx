import Model from "@/components/3d/landing";
import { ArrowRight, Link2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative z-0 flex h-screen w-screen items-center justify-start overflow-hidden">
      <div className="z-10 flex flex-col items-start pb-12 pl-[10vw]">
        <div className="bg-gradient-to-br from-white via-white/60 to-transparent bg-clip-text text-[10rem] leading-[1] text-transparent">
          Jarvis
        </div>
        <div className="mt-4 flex space-x-2 text-muted-foreground">
          <div className="rounded-full border border-muted-foreground px-4 py-1">
            SE101
          </div>
          <div className="rounded-full border border-muted-foreground px-4 py-1">
            Team 10
          </div>
        </div>
        <div className="mt-24 max-w-xl text-xl text-muted-foreground">
          An touch-free, interactive 3D hologram experience. Interact with a{" "}
          <a
            href="https://en.wikipedia.org/wiki/Pepper%27s_ghost"
            target="_blank"
            className="border-b border-muted-foreground font-medium"
          >
            Pepper's Ghost <Link2 className="inline h-4 w-4" />
          </a>{" "}
          illusion through three-dimensional hand gestures. and voice commands.
        </div>
        <Link href="/app">
          <button className="group mt-4 flex items-center border-b border-muted-foreground py-0.5 text-xl font-semibold duration-300 hover:border-muted-foreground hover:text-muted-foreground">
            Enter{" "}
            <ArrowRight className="ml-2 h-4 w-4 rotate-0 duration-300 group-hover:-rotate-45" />
          </button>
        </Link>
      </div>
      <div className="absolute left-0 top-0 h-full w-full">
        <Model />
      </div>
    </div>
  );
}
