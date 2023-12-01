import Model from "@/components/3d";
import VoiceControl from "@/components/voice";
// import Menu from "@/components/menu";
import dynamic from "next/dynamic";

const RealTime = dynamic(() => import("@/components/realtime"), {
  ssr: false,
});

const Menu = dynamic(() => import("@/components/menu"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative z-0 flex h-screen w-screen items-center justify-center overflow-hidden">
      <RealTime />
      <VoiceControl />

      <Menu />
      <Model />
    </div>
  );
}
