"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  OrbitControls,
  useGLTF,
  TransformControls,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  LUT,
  BrightnessContrast,
  HueSaturation,
  ToneMapping,
} from "@react-three/postprocessing";
import { LUTCubeLoader, ToneMappingMode } from "postprocessing";
import { useControls } from "leva";
import { useStore } from "@/lib/state";
import Porsche from "./porsche";
import IronMan from "./ironman";
import Goose from "./goose";
import BlackHole from "./blackhole";
import Minutes from "./minutes";

export default function Model() {
  // const texture = useLoader(LUTCubeLoader, "/lut.cube");

  const { target, setTarget, objects } = useStore();
  // const { mode } = useControls({
  //   mode: { value: "translate", options: ["translate", "rotate", "scale"] },
  // });

  return (
    <Canvas
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 5], fov: 35 }}
      onCreated={(state) => {
        state.gl.toneMapping = THREE.NoToneMapping;
      }}
    >
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      {objects.porsche.visible ? <Porsche /> : null}
      {objects.ironman.visible ? <IronMan /> : null}
      {objects.goose.visible ? <Goose /> : null}
      {objects.blackhole.visible ? <BlackHole /> : null}
      {objects.minutes.visible ? <Minutes /> : null}

      {/* {target && (
        <TransformControls
          object={target}
          mode={mode as "translate" | "rotate" | "scale"}
        />
      )} */}

      <OrbitControls
        enableRotate={false}
        enableZoom={false}
        // autoRotate={true}
        // autoRotateSpeed={4}
        // minPolarAngle={Math.PI / 2.1}
        // maxPolarAngle={Math.PI / 2.1}
      />
      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/blue_photo_studio_1k.hdr"
        resolution={512}
      >
        <group rotation={[0, 0, 1]}>
          <Lightformer
            form="circle"
            intensity={1}
            position={[0, 10, -10]}
            scale={20}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
          <Lightformer
            intensity={0.1}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[-5, 1, -1]}
            rotation-y={Math.PI / 2}
            scale={[50, 10, 1]}
          />
          <Lightformer
            intensity={0.1}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[10, 1, 0]}
            rotation-y={-Math.PI / 2}
            scale={[50, 10, 1]}
          />
          <Lightformer
            color="white"
            intensity={1}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[0, 1, 0]}
            scale={[10, 100, 1]}
          />
        </group>
      </Environment>
      <EffectComposer disableNormalPass>
        {/* <Bloom mipmapBlur luminanceThreshold={1} intensity={1} /> */}
        <BrightnessContrast brightness={0} contrast={0.1} />
        <HueSaturation hue={0} saturation={0.1} />
        {/* <ToneMapping mode={ToneMappingMode.ACES_FILMIC} /> */}
      </EffectComposer>
    </Canvas>
  );
}
