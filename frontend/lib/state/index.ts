import { create } from "zustand";
import initialObjects from "./initialObjects";
import { off } from "process";

type ObjectData = {
  name: string;
  offsetY: number;
  offsetScale: number;
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
};

export type ModelName =
  | "porsche"
  | "ironman"
  | "blackhole"
  | "goose"
  | "minutes";

export type Objects = {
  [key in ModelName]: ObjectData;
};

export type Gestures = "drag" | "rotate" | "scale" | "point";

type State = {
  target: ModelName | null;
  setTarget: (target: ModelName | null) => void;
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
  objects: Objects;
  pointer: { x: number; y: number; z: number };
  setPointer: (pointer: { x: number; y: number; z: number }) => void;
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
  menuOpen: true,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  objects: initialObjects,
  pointer: { x: 0, y: 0, z: 0 },
  setPointer: (pointer) => set({ pointer }),
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
