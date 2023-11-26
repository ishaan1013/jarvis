import { create } from "zustand";

type State = {
  target: THREE.Object3D | null;
  setTarget: (target: THREE.Object3D | null) => void;
};

export const useStore = create<State>((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
}));
