import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useStore } from "@/lib/state";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    ["M-COC_iOS_HERO_Tony_Stark_Iron_Man_Mark_VII_COC_iOS_HER_TST_VII_B_0"]: THREE.Mesh;
  };
  materials: {
    COC_iOS_HER_TST_VII_B: THREE.MeshStandardMaterial;
  };
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export default function IronMan() {
  const { nodes, materials } = useGLTF("/3d/ironman.glb") as GLTFResult;

  const { objects, setRotation } = useStore();

  const offsetY = objects.ironman.offsetY;
  const offsetScale = objects.ironman.offsetScale;
  const position = objects.ironman.position;
  const rotation = objects.ironman.rotation;
  const scale = objects.ironman.scale;

  useFrame(() => {
    setRotation("ironman", {
      x: rotation.x,
      y: rotation.y + 0.02,
      z: rotation.z,
    });
  });

  return (
    <group
      scale={scale + offsetScale}
      position={[position.x, position.y - offsetY, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      dispose={null}
    >
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.003}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={
              nodes[
                "M-COC_iOS_HERO_Tony_Stark_Iron_Man_Mark_VII_COC_iOS_HER_TST_VII_B_0"
              ].geometry
            }
            material={materials.COC_iOS_HER_TST_VII_B}
            scale={343.448}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/3d/ironman.glb");
