import Model from "@/components/3d";
import Cursor from "@/components/cursor";
// import Menu from "@/components/menu";
import dynamic from "next/dynamic";

const RealTime = dynamic(() => import("@/components/realtime"), {
  ssr: false,
});

const Menu = dynamic(() => import("@/components/menu"), {
  ssr: false,
});

const VoiceControl = dynamic(() => import("@/components/voice"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative z-0 flex h-screen w-screen items-center justify-center overflow-hidden">
      <RealTime />
      <VoiceControl />
      <Cursor />

      <Menu />
      <Model />
    </div>
  );
}
