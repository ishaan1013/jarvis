import { create } from "zustand";
import initialObjects from "./initialObjects";

// type Visible = {
//   porsche: boolean;
//   ironman: boolean;
//   goose: boolean;
// };

type ObjectData = {
  position: {
    x: number;
    y: number;
    z: number;
  };
  // need to remove one
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  scale: number;
  visible: boolean;
};

export type ModelName =
  | "porsche"
  | "ironman"
  | "blackhole"
  | "goose"
  | "minutes";

type Objects = {
  [key in ModelName]: ObjectData;
};

export type Gestures = "drag" | "rotate" | "scale" | "point";

type State = {
  target: THREE.Object3D | null;
  setTarget: (target: THREE.Object3D | null) => void;
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
  objects: Objects;
  pointer: { x: number; y: number };
  setPointer: (pointer: { x: number; y: number }) => void;
  setVisible: (modelName: ModelName, visible: boolean) => void;
  clearAll: () => void;
  setPosition: (
    modelName: ModelName,
    position: { x: number; y: number; z: number },
  ) => void;
  setRotation: (
    modelName: ModelName,
    rotation: { x: number; y: number; z: number },
  ) => void;
  setScale: (modelName: ModelName, scale: number) => void;
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
  jarvis: boolean;
  setJarvis: (jarvis: boolean) => void;
  gesture: Gestures | null;
  setGesture: (gesture: Gestures | null) => void;
};

export const useStore = create<State>((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  objects: initialObjects,
  pointer: { x: 0.25, y: 0.25 },
  setPointer: (pointer) => set({ pointer }),
  setVisible: (modelName, visible) =>
    set((state) => ({
      objects: {
        ...state.objects,
        [modelName]: {
          ...state.objects[modelName],
          visible,
        },
      },
    })),
  clearAll: () =>
    set((state) => ({
      objects: Object.keys(state.objects).reduce(
        (acc, modelName) => ({
          ...acc,
          [modelName]: {
            ...state.objects[modelName as ModelName],
            visible: false,
          },
        }),
        {} as Objects,
      ),
    })),
  setPosition: (modelName, position) =>
    set((state) => ({
      objects: {
        ...state.objects,
        [modelName]: {
          ...state.objects[modelName],
          position,
        },
      },
    })),
  setRotation: (modelName, rotation) =>
    set((state) => ({
      objects: {
        ...state.objects,
        [modelName]: {
          ...state.objects[modelName],
          rotation,
        },
      },
    })),
  setScale: (modelName, scale) =>
    set((state) => ({
      objects: {
        ...state.objects,
        [modelName]: {
          ...state.objects[modelName],
          scale,
        },
      },
    })),
  isConnected: false,
  setIsConnected: (isConnected) => set({ isConnected }),
  jarvis: false,
  setJarvis: (jarvis) => set({ jarvis }),
  gesture: null,
  setGesture: (gesture) => set({ gesture }),
}));
