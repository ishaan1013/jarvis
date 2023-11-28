import Model from "@/components/3d";
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
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <RealTime />

      <Menu />
      <Model />
    </div>
  );
}
