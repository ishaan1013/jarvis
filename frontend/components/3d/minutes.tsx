import * as THREE from "three";
import { useGLTF, useCursor } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useRef, useState } from "react";
import { useStore } from "@/lib/state";

type GLTFResult = GLTF & {
  nodes: {
    Object_7: THREE.SkinnedMesh;
    Object_9: THREE.SkinnedMesh;
    Object_11: THREE.SkinnedMesh;
    Object_72: THREE.SkinnedMesh;
    _rootJoint: THREE.Bone;
  };
  materials: {
    Arms_Texture: THREE.MeshStandardMaterial;
    Legs: THREE.MeshStandardMaterial;
    Shoes: THREE.MeshStandardMaterial;
    Face: THREE.MeshStandardMaterial;
  };
};
type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export default function Minutes() {
  const { nodes, materials } = useGLTF("/3d/minutes.glb") as GLTFResult;
  const { target, setTarget } = useStore();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const ref = useRef<THREE.Group>(null!);

  const { objects } = useStore();

  const offsetY = objects.minutes.offsetY;
  const position = objects.minutes.position;
  const rotation = objects.minutes.rotation;
  const scale = objects.minutes.scale;

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
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.186}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <primitive object={nodes._rootJoint} />
            <skinnedMesh
              geometry={nodes.Object_7.geometry}
              material={materials.Arms_Texture}
              skeleton={nodes.Object_7.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Object_9.geometry}
              material={materials.Legs}
              skeleton={nodes.Object_9.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Object_11.geometry}
              material={materials.Shoes}
              skeleton={nodes.Object_11.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Object_72.geometry}
              material={materials.Face}
              skeleton={nodes.Object_72.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/3d/minutes.glb");
