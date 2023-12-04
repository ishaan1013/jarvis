/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 mobius.glb --types 
Author: SantyFrow (https://sketchfab.com/santyfrow)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/the-mobius-strip-375f651cb8dd474ba1065586a0571adf
Title: The Mobius Strip
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh
    Object_5: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/mobius.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group rotation={[0.675, 0, -Math.PI / 2]}>
        <mesh geometry={nodes.Object_4.geometry} material={materials.Material} />
        <mesh geometry={nodes.Object_5.geometry} material={materials['Material.001']} />
      </group>
    </group>
  )
}

useGLTF.preload('/mobius.glb')