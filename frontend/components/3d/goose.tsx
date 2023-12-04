import * as THREE from "three";
import { useGLTF, useCursor } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useRef, useState } from "react";
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
  const { nodes, materials } = useGLTF("/3d/goose.glb") as GLTFResult;
  const { target, setTarget } = useStore();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const ref = useRef<THREE.Group>(null!);

  const { objects } = useStore();

  const offsetY = objects.goose.offsetY;
  const position = objects.goose.position;
  const rotation = objects.goose.rotation;
  const scale = objects.goose.scale;

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

useGLTF.preload("/3d/goose.glb");
