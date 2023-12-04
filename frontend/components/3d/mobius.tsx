import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useStore } from "@/lib/state";

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export default function Mobius() {
  const { nodes, materials } = useGLTF("/3d/mobius.glb") as GLTFResult;

  const { objects } = useStore();

  const offsetY = objects.mobius.offsetY;
  const offsetScale = objects.mobius.offsetScale;
  const position = objects.mobius.position;
  const rotation = objects.mobius.rotation;
  const scale = objects.mobius.scale;

  return (
    <group
      scale={scale + offsetScale}
      position={[position.x, position.y - offsetY, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      dispose={null}
    >
      <group rotation={[0.675, 0, -Math.PI / 2]}>
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials["Material.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/3d/mobius.glb");
