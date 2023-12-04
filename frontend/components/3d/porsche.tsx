import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useStore } from "@/lib/state";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
    Object_3: THREE.Mesh;
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_7: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_9: THREE.Mesh;
    Object_10: THREE.Mesh;
    Object_11: THREE.Mesh;
    Object_12: THREE.Mesh;
    Object_13: THREE.Mesh;
    Object_14: THREE.Mesh;
    Object_15: THREE.Mesh;
    Object_16: THREE.Mesh;
    Object_17: THREE.Mesh;
    Object_18: THREE.Mesh;
    Object_19: THREE.Mesh;
    Object_20: THREE.Mesh;
    Object_21: THREE.Mesh;
    Object_22: THREE.Mesh;
    Object_23: THREE.Mesh;
    Object_24: THREE.Mesh;
    Object_25: THREE.Mesh;
    Object_26: THREE.Mesh;
    Object_27: THREE.Mesh;
    Object_28: THREE.Mesh;
    Object_29: THREE.Mesh;
    Object_30: THREE.Mesh;
    Object_31: THREE.Mesh;
    Object_32: THREE.Mesh;
    Object_33: THREE.Mesh;
    Object_34: THREE.Mesh;
    Object_35: THREE.Mesh;
    Object_36: THREE.Mesh;
    Object_37: THREE.Mesh;
    Object_38: THREE.Mesh;
    Object_39: THREE.Mesh;
    Object_40: THREE.Mesh;
    Object_41: THREE.Mesh;
    Object_42: THREE.Mesh;
    Object_43: THREE.Mesh;
    Object_44: THREE.Mesh;
    Object_45: THREE.Mesh;
    Object_46: THREE.Mesh;
    Object_47: THREE.Mesh;
    Object_48: THREE.Mesh;
    Object_49: THREE.Mesh;
    Object_50: THREE.Mesh;
    Object_51: THREE.Mesh;
    Object_52: THREE.Mesh;
    Object_53: THREE.Mesh;
    Object_54: THREE.Mesh;
    Object_55: THREE.Mesh;
    Object_56: THREE.Mesh;
    Object_57: THREE.Mesh;
    Object_58: THREE.Mesh;
    Object_59: THREE.Mesh;
    Object_60: THREE.Mesh;
    Object_61: THREE.Mesh;
    Object_62: THREE.Mesh;
    Object_63: THREE.Mesh;
    Object_64: THREE.Mesh;
    Object_65: THREE.Mesh;
    Object_66: THREE.Mesh;
    Object_67: THREE.Mesh;
    Object_68: THREE.Mesh;
    Object_69: THREE.Mesh;
    Object_70: THREE.Mesh;
    Object_71: THREE.Mesh;
    Object_72: THREE.Mesh;
    Object_73: THREE.Mesh;
    Object_74: THREE.Mesh;
    Object_75: THREE.Mesh;
    Object_76: THREE.Mesh;
    Object_77: THREE.Mesh;
    Object_78: THREE.Mesh;
    Object_79: THREE.Mesh;
    Object_80: THREE.Mesh;
  };
  materials: {
    CarreraGT: THREE.MeshStandardMaterial;
    ENGINEgrill: THREE.MeshStandardMaterial;
    PORSCHEenginelogo: THREE.MeshStandardMaterial;
    Porsche_Carrera_GT_Concept_2000_Replica_By_Alex_Ka: THREE.MeshPhysicalMaterial;
    Porsche_Carrera_GT_Concept_2000_Replica_By_Alex_Ka_2: THREE.MeshPhysicalMaterial;
    material: THREE.MeshPhysicalMaterial;
    material_6: THREE.MeshPhysicalMaterial;
    blackaluminium: THREE.MeshStandardMaterial;
    blackchrome: THREE.MeshStandardMaterial;
    blackmatte: THREE.MeshStandardMaterial;
    blackmatte2: THREE.MeshStandardMaterial;
    blackplastic: THREE.MeshPhysicalMaterial;
    bottom: THREE.MeshStandardMaterial;
    brakedisc: THREE.MeshStandardMaterial;
    brakelight: THREE.MeshPhysicalMaterial;
    brakelight2: THREE.MeshPhysicalMaterial;
    buttons: THREE.MeshStandardMaterial;
    carSHADOW: THREE.MeshStandardMaterial;
    centrebrakelampglass: THREE.MeshPhysicalMaterial;
    chrome: THREE.MeshStandardMaterial;
    concept: THREE.MeshStandardMaterial;
    detailschrome: THREE.MeshStandardMaterial;
    detailsmatte: THREE.MeshStandardMaterial;
    detailsplastic: THREE.MeshPhysicalMaterial;
    diffuzer: THREE.MeshPhysicalMaterial;
    emblem: THREE.MeshPhysicalMaterial;
    engine: THREE.MeshStandardMaterial;
    enginechrome1: THREE.MeshPhysicalMaterial;
    enginechrome2: THREE.MeshPhysicalMaterial;
    enginehead: THREE.MeshStandardMaterial;
    exhametal1: THREE.MeshPhysicalMaterial;
    exhametal2: THREE.MeshStandardMaterial;
    exhaustbronze: THREE.MeshStandardMaterial;
    exhaustchrome: THREE.MeshStandardMaterial;
    exhausthole: THREE.MeshStandardMaterial;
    floor: THREE.MeshPhysicalMaterial;
    floormat: THREE.MeshStandardMaterial;
    floormat2: THREE.MeshStandardMaterial;
    foglight: THREE.MeshStandardMaterial;
    frontbumperplastic: THREE.MeshPhysicalMaterial;
    grill1: THREE.MeshStandardMaterial;
    grill2: THREE.MeshStandardMaterial;
    grillrear: THREE.MeshStandardMaterial;
    headlightglass: THREE.MeshStandardMaterial;
    headlights1: THREE.MeshStandardMaterial;
    headlights2: THREE.MeshStandardMaterial;
    headlightwhiteplastic: THREE.MeshPhysicalMaterial;
    interior: THREE.MeshStandardMaterial;
    interiorblackplastic: THREE.MeshPhysicalMaterial;
    interiorgrayplastic: THREE.MeshStandardMaterial;
    interiormatte: THREE.MeshStandardMaterial;
    interiormirror: THREE.MeshStandardMaterial;
    interiorplastic: THREE.MeshStandardMaterial;
    needforspeed: THREE.MeshPhysicalMaterial;
    plateFRONT: THREE.MeshStandardMaterial;
    plateFRONT2: THREE.MeshStandardMaterial;
    plateLAMP1: THREE.MeshPhysicalMaterial;
    plateREAR: THREE.MeshStandardMaterial;
    plateREAR2: THREE.MeshStandardMaterial;
    plateREDlamp: THREE.MeshPhysicalMaterial;
    platelogo: THREE.MeshPhysicalMaterial;
    radiator: THREE.MeshStandardMaterial;
    rim1: THREE.MeshStandardMaterial;
    rim2: THREE.MeshPhysicalMaterial;
    rim3: THREE.MeshStandardMaterial;
    rim5: THREE.MeshStandardMaterial;
    rimEMBLEM: THREE.MeshPhysicalMaterial;
    seatbelt: THREE.MeshStandardMaterial;
    sidemirrors: THREE.MeshStandardMaterial;
    splitter: THREE.MeshPhysicalMaterial;
    suport1: THREE.MeshPhysicalMaterial;
    suport2: THREE.MeshPhysicalMaterial;
    suportlogo: THREE.MeshStandardMaterial;
    tire: THREE.MeshStandardMaterial;
    tireSIDE: THREE.MeshStandardMaterial;
    turnsignalF: THREE.MeshStandardMaterial;
    turnsignalS: THREE.MeshStandardMaterial;
    wfins: THREE.MeshStandardMaterial;
    wsins: THREE.MeshPhysicalMaterial;
  };
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export default function Porsche() {
  const { nodes, materials } = useGLTF("/3d/porsche.glb") as GLTFResult;

  const { objects } = useStore();

  const offsetY = objects.porsche.offsetY;
  const offsetScale = objects.porsche.offsetScale;
  const position = objects.porsche.position;
  const rotation = objects.porsche.rotation;
  const scale = objects.porsche.scale;

  return (
    <group
      scale={scale + offsetScale}
      position={[position.x, position.y - offsetY, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      dispose={null}
    >
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1.042}>
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials.CarreraGT}
        />
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials.ENGINEgrill}
        />
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.PORSCHEenginelogo}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={
            materials.Porsche_Carrera_GT_Concept_2000_Replica_By_Alex_Ka
          }
        />
        <mesh
          geometry={nodes.Object_6.geometry}
          material={
            materials.Porsche_Carrera_GT_Concept_2000_Replica_By_Alex_Ka_2
          }
        />
        <mesh
          geometry={nodes.Object_7.geometry}
          material={materials.material}
        />
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials.material_6}
        />
        <mesh
          geometry={nodes.Object_9.geometry}
          material={materials.blackaluminium}
        />
        <mesh
          geometry={nodes.Object_10.geometry}
          material={materials.blackchrome}
        />
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials.blackmatte}
        />
        <mesh
          geometry={nodes.Object_12.geometry}
          material={materials.blackmatte2}
        />
        <mesh
          geometry={nodes.Object_13.geometry}
          material={materials.blackplastic}
        />
        <mesh geometry={nodes.Object_14.geometry} material={materials.bottom} />
        <mesh
          geometry={nodes.Object_15.geometry}
          material={materials.brakedisc}
        />
        <mesh
          geometry={nodes.Object_16.geometry}
          material={materials.brakelight}
        />
        <mesh
          geometry={nodes.Object_17.geometry}
          material={materials.brakelight2}
        />
        <mesh
          geometry={nodes.Object_18.geometry}
          material={materials.buttons}
        />
        <mesh
          geometry={nodes.Object_19.geometry}
          material={materials.carSHADOW}
        />
        <mesh
          geometry={nodes.Object_20.geometry}
          material={materials.centrebrakelampglass}
        />
        <mesh geometry={nodes.Object_21.geometry} material={materials.chrome} />
        <mesh
          geometry={nodes.Object_22.geometry}
          material={materials.concept}
        />
        <mesh
          geometry={nodes.Object_23.geometry}
          material={materials.detailschrome}
        />
        <mesh
          geometry={nodes.Object_24.geometry}
          material={materials.detailsmatte}
        />
        <mesh
          geometry={nodes.Object_25.geometry}
          material={materials.detailsplastic}
        />
        <mesh
          geometry={nodes.Object_26.geometry}
          material={materials.diffuzer}
        />
        <mesh geometry={nodes.Object_27.geometry} material={materials.emblem} />
        <mesh geometry={nodes.Object_28.geometry} material={materials.engine} />
        <mesh
          geometry={nodes.Object_29.geometry}
          material={materials.enginechrome1}
        />
        <mesh
          geometry={nodes.Object_30.geometry}
          material={materials.enginechrome2}
        />
        <mesh
          geometry={nodes.Object_31.geometry}
          material={materials.enginehead}
        />
        <mesh
          geometry={nodes.Object_32.geometry}
          material={materials.exhametal1}
        />
        <mesh
          geometry={nodes.Object_33.geometry}
          material={materials.exhametal2}
        />
        <mesh
          geometry={nodes.Object_34.geometry}
          material={materials.exhaustbronze}
        />
        <mesh
          geometry={nodes.Object_35.geometry}
          material={materials.exhaustchrome}
        />
        <mesh
          geometry={nodes.Object_36.geometry}
          material={materials.exhausthole}
        />
        {/* <mesh geometry={nodes.Object_37.geometry} material={materials.floor} /> */}
        <mesh
          geometry={nodes.Object_38.geometry}
          material={materials.floormat}
        />
        <mesh
          geometry={nodes.Object_39.geometry}
          material={materials.floormat2}
        />
        <mesh
          geometry={nodes.Object_40.geometry}
          material={materials.foglight}
        />
        <mesh
          geometry={nodes.Object_41.geometry}
          material={materials.frontbumperplastic}
        />
        <mesh geometry={nodes.Object_42.geometry} material={materials.grill1} />
        <mesh geometry={nodes.Object_43.geometry} material={materials.grill2} />
        <mesh
          geometry={nodes.Object_44.geometry}
          material={materials.grillrear}
        />
        <mesh
          geometry={nodes.Object_45.geometry}
          material={materials.headlightglass}
        />
        <mesh
          geometry={nodes.Object_46.geometry}
          material={materials.headlights1}
        />
        <mesh
          geometry={nodes.Object_47.geometry}
          material={materials.headlights2}
        />
        <mesh
          geometry={nodes.Object_48.geometry}
          material={materials.headlightwhiteplastic}
        />
        <mesh
          geometry={nodes.Object_49.geometry}
          material={materials.interior}
        />
        <mesh
          geometry={nodes.Object_50.geometry}
          material={materials.interiorblackplastic}
        />
        <mesh
          geometry={nodes.Object_51.geometry}
          material={materials.interiorgrayplastic}
        />
        <mesh
          geometry={nodes.Object_52.geometry}
          material={materials.interiormatte}
        />
        <mesh
          geometry={nodes.Object_53.geometry}
          material={materials.interiormirror}
        />
        <mesh
          geometry={nodes.Object_54.geometry}
          material={materials.interiorplastic}
        />
        <mesh
          geometry={nodes.Object_55.geometry}
          material={materials.needforspeed}
        />
        <mesh
          geometry={nodes.Object_56.geometry}
          material={materials.plateFRONT}
        />
        <mesh
          geometry={nodes.Object_57.geometry}
          material={materials.plateFRONT2}
        />
        <mesh
          geometry={nodes.Object_58.geometry}
          material={materials.plateLAMP1}
        />
        <mesh
          geometry={nodes.Object_59.geometry}
          material={materials.plateREAR}
        />
        <mesh
          geometry={nodes.Object_60.geometry}
          material={materials.plateREAR2}
        />
        <mesh
          geometry={nodes.Object_61.geometry}
          material={materials.plateREDlamp}
        />
        <mesh
          geometry={nodes.Object_62.geometry}
          material={materials.platelogo}
        />
        <mesh
          geometry={nodes.Object_63.geometry}
          material={materials.radiator}
        />
        <mesh geometry={nodes.Object_64.geometry} material={materials.rim1} />
        <mesh geometry={nodes.Object_65.geometry} material={materials.rim2} />
        <mesh geometry={nodes.Object_66.geometry} material={materials.rim3} />
        <mesh geometry={nodes.Object_67.geometry} material={materials.rim5} />
        <mesh
          geometry={nodes.Object_68.geometry}
          material={materials.rimEMBLEM}
        />
        <mesh
          geometry={nodes.Object_69.geometry}
          material={materials.seatbelt}
        />
        <mesh
          geometry={nodes.Object_70.geometry}
          material={materials.sidemirrors}
        />
        <mesh
          geometry={nodes.Object_71.geometry}
          material={materials.splitter}
        />
        <mesh
          geometry={nodes.Object_72.geometry}
          material={materials.suport1}
        />
        <mesh
          geometry={nodes.Object_73.geometry}
          material={materials.suport2}
        />
        <mesh
          geometry={nodes.Object_74.geometry}
          material={materials.suportlogo}
        />
        <mesh geometry={nodes.Object_75.geometry} material={materials.tire} />
        <mesh
          geometry={nodes.Object_76.geometry}
          material={materials.tireSIDE}
        />
        <mesh
          geometry={nodes.Object_77.geometry}
          material={materials.turnsignalF}
        />
        <mesh
          geometry={nodes.Object_78.geometry}
          material={materials.turnsignalS}
        />
        <mesh geometry={nodes.Object_79.geometry} material={materials.wfins} />
        <mesh geometry={nodes.Object_80.geometry} material={materials.wsins} />
      </group>
    </group>
  );
}

useGLTF.preload("/3d/porsche.glb");
