import { create } from "zustand";

type Visible = {
  cars: boolean;
  ironman: boolean;
};

type State = {
  target: THREE.Object3D | null;
  setTarget: (target: THREE.Object3D | null) => void;
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
  visible: Visible;
  setVisible: (visible: Visible) => void;
};

export const useStore = create<State>((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  visible: {
    cars: true,
    ironman: false,
  },
  setVisible: (visible) => set({ visible }),
}));
