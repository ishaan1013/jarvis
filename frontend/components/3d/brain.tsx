import * as THREE from "three";
import { useGLTF, useCursor, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/state";
import { useControls } from "leva";

type GLTFResult = GLTF & {
  nodes: {
    Icosphere001_Particle_2_0: THREE.Mesh;
    Icosphere001_Particle_2_0_1: THREE.Mesh;
    Icosphere001_Particle_2_0_2: THREE.Mesh;
    Icosphere001_Particle_1_0: THREE.Mesh;
    Icosphere001_Particle_1_0_1: THREE.Mesh;
    Icosphere001_Particle_1_0_2: THREE.Mesh;
  };
  materials: {
    Particle_2: THREE.MeshStandardMaterial;
    Particle_1: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ActionName = "Scene";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}
type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export default function Brain() {
  const { objects, url } = useStore();

  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(url ?? "") as GLTFResult;
  const { actions } = useAnimations(animations, group);

  // useEffect(() => {
  //   actions["Scene"]?.play();

  //   return () => {
  //     actions["Scene"]?.stop();
  //   };
  // }, []);

  const offsetY = objects.brain.offsetY;
  const offsetScale = objects.brain.offsetScale;
  const position = objects.brain.position;
  const rotation = objects.brain.rotation;
  const scale = objects.brain.scale;

  if (!url) return null;

  return (
    <group
      ref={group}
      scale={scale + offsetScale}
      position={[position.x, position.y - offsetY, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      dispose={null}
    >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="07e8ba9162674e488df6dd56fc54b2e3fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Icosphere001"
                  rotation={[-Math.PI / 2, 0, -2.734]}
                  scale={100}
                >
                  <mesh
                    name="Icosphere001_Particle_2_0"
                    geometry={nodes.Icosphere001_Particle_2_0.geometry}
                    material={materials.Particle_2}
                  />
                  <mesh
                    name="Icosphere001_Particle_2_0_1"
                    geometry={nodes.Icosphere001_Particle_2_0_1.geometry}
                    material={materials.Particle_2}
                  />
                  <mesh
                    name="Icosphere001_Particle_2_0_2"
                    geometry={nodes.Icosphere001_Particle_2_0_2.geometry}
                    material={materials.Particle_2}
                  />
                  <mesh
                    name="Icosphere001_Particle_1_0"
                    geometry={nodes.Icosphere001_Particle_1_0.geometry}
                    material={materials.Particle_1}
                  />
                  <mesh
                    name="Icosphere001_Particle_1_0_1"
                    geometry={nodes.Icosphere001_Particle_1_0_1.geometry}
                    material={materials.Particle_1}
                  />
                  <mesh
                    name="Icosphere001_Particle_1_0_2"
                    geometry={nodes.Icosphere001_Particle_1_0_2.geometry}
                    material={materials.Particle_1}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
