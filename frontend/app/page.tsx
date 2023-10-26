import Dnd from "@/components/dnd";
import dynamic from "next/dynamic";

const RealTime = dynamic(() => import("@/components/realtime"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <RealTime />
      {/* <div className="z-10 h-full w-full">
        <Dnd />
      </div> */}
    </div>
  );
}
