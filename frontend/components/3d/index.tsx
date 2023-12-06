"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  LUT,
  BrightnessContrast,
  HueSaturation,
  ToneMapping,
} from "@react-three/postprocessing";
// import { LUTCubeLoader, ToneMappingMode } from "postprocessing";
import { useStore } from "@/lib/state";
import { useEffect, useRef } from "react";
import { displayModel } from "@/lib";
import { handleDownload } from "@/lib/r2";

export default function Model() {
  // const texture = useLoader(LUTCubeLoader, "/lut.cube");

  const { objects, target, setUrl, url } = useStore();

  useEffect(() => {
    const dl = async () => {
      return await handleDownload(target + ".glb");
    };
    if (target) {
      dl().then((url) => setUrl(url));
    }
  }, [target]);

  const canvas = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      ref={canvas}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 200], fov: 1 }}
      onCreated={(state) => {
        state.gl.toneMapping = THREE.NoToneMapping;
      }}
    >
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      {url ? displayModel(target) : null}

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
        <Bloom mipmapBlur luminanceThreshold={1} intensity={0.5} />
        <BrightnessContrast brightness={0} contrast={0.1} />
        <HueSaturation hue={0} saturation={0.1} />
        {/* <ToneMapping mode={ToneMappingMode.ACES_FILMIC} /> */}
      </EffectComposer>
    </Canvas>
  );
}
