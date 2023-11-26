import * as THREE from "three";
import {
  MeshTransmissionMaterial,
  useGLTF,
  useCursor,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useRef, useState } from "react";
import { useStore } from "@/lib/state";

type GLTFResult = GLTF & {
  nodes: {
    petals: THREE.Mesh;
    Sphere: THREE.Mesh;
    Sphere001: THREE.Mesh;
  };
  materials: {};
};

export default function Flower() {
  const { nodes, materials } = useGLTF("/flower-transformed.glb") as GLTFResult;
  const { target, setTarget } = useStore();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const ref = useRef<THREE.Group>(null!);
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    z: number;
  }>({
    x: 0,
    y: 0,
    z: 0,
  });

  const [rotation, setRotation] = useState<{
    x: number;
    y: number;
    z: number;
  }>({
    x: 0,
    y: 0,
    z: 0,
  });

  const [scale, setScale] = useState(0.5);

  // useFrame(() => {
  //   if (target) {
  //     setRotation((state) => ({
  //       x: state.x + 0.01,
  //       y: state.y + 0.01,
  //       z: state.z + 0.01,
  //     }));
  //   }
  // });

  return (
    <group
      ref={ref}
      onClick={(e) => setTarget(ref.current)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={scale}
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      dispose={null}
    >
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
useGLTF.preload("/flower-transformed.glb");
