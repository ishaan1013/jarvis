import * as THREE from "three";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useRef, useState } from "react";

type GLTFResult = GLTF & {
  nodes: {
    petals: THREE.Mesh;
    Sphere: THREE.Mesh;
    Sphere001: THREE.Mesh;
  };
  materials: {};
};

export default function Flower() {
  const { nodes, materials } = useGLTF(
    "/3d/flower-transformed.glb",
  ) as GLTFResult;

  return (
    <group scale={0.5} position={[0, 0, 0]} rotation={[0, 0, 0]} dispose={null}>
      <mesh geometry={nodes.petals.geometry}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          samples={16}
          thickness={0.2}
          anisotropicBlur={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          clearcoat={1}
          envMapIntensity={0.5}
          distortionScale={0.1}
          temporalDistortion={0.1}
        />
        <mesh geometry={nodes.Sphere.geometry}>
          <MeshTransmissionMaterial
            samples={6}
            resolution={512}
            thickness={-1}
            anisotropy={0.25}
            distortionScale={0.1}
            temporalDistortion={0.1}
          />
        </mesh>
      </mesh>
      {/* <mesh geometry={nodes.Sphere001.geometry}>
        <meshStandardMaterial
          toneMapped={false}
          emissive="hotpink"
          color="red"
          emissiveIntensity={2}
        />
      </mesh> */}
    </group>
  );
}
useGLTF.preload("/3d/flower-transformed.glb");
