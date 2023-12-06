import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useStore } from "@/lib/state";

type GLTFResult = GLTF & {
  nodes: {
    ["material_0-material"]: THREE.Mesh;
  };
  materials: {
    material_0: THREE.MeshStandardMaterial;
  };
};
type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export default function Goose() {
  const { objects, url } = useStore();
  const { nodes, materials } = useGLTF(url ?? "") as GLTFResult;

  const offsetY = objects.goose.offsetY;
  const offsetScale = objects.goose.offsetScale;
  const position = objects.goose.position;
  const rotation = objects.goose.rotation;
  const scale = objects.goose.scale;

  if (!url) return null;
  return (
    <group
      scale={scale + offsetScale}
      position={[position.x, position.y - offsetY, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      dispose={null}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes["material_0-material"].geometry}
          material={materials.material_0}
          position={[0, -0.028, 0]}
          rotation={[0.979, 0.759, 0.48]}
        />
      </group>
    </group>
  );
}
